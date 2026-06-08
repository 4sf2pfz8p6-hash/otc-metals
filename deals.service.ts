import { pool } from "./db";

const DEAL_LIMIT = 10;

const ACTIVE_STATUSES = [
  "interest_sent",
  "confirmed",
  "reveal_pending",
  "contacts_revealed",
  "awaiting_confirmation",
];

async function getParticipant(id: string) {
  const r = await pool.query(
    `SELECT participant_id, company_name, contact_person, phone, email,
            participant_type, status, deals_completed, created_at
     FROM projection.participants WHERE participant_id = $1`,
    [id]
  );
  return r.rows[0] || null;
}

async function getOffer(offerId: string) {
  const r = await pool.query(
    `SELECT * FROM projection.offers_state WHERE offer_id = $1`,
    [offerId]
  );
  return r.rows[0] || null;
}

async function notify(participantId: string, type: string, dealId: string | null, offerId: string | null) {
  await pool.query(
    `INSERT INTO projection.notifications (participant_id, deal_id, offer_id, type)
     VALUES ($1, $2, $3, $4)`,
    [participantId, dealId, offerId, type]
  );
}

function counterpartyFacts(p: any) {
  return {
    participant_type: p?.participant_type || "other",
    verified: p?.status === "verified",
    deals_completed: p?.deals_completed ?? 0,
    avg_response: "~15 мин",
    since: p?.created_at ? new Date(p.created_at).toISOString().slice(0, 7) : null,
  };
}

function offerSnapshot(o: any) {
  return {
    metal: o.metal,
    purity: o.purity,
    side: o.side,
    price_rub_per_gram: Number(o.price_rub_per_gram),
    volume_kg: Number(o.volume_grams) / 1000,
    region: o.region,
    location: o.location || o.region,
    vat_mode: o.vat_mode,
    urgency: o.urgency,
    metal_form: o.metal_form,
    item_category: o.item_category || "raw",
  };
}

async function currentDealRow(offerId: string) {
  const active = await pool.query(
    `SELECT * FROM projection.deals
     WHERE offer_id = $1 AND status = ANY($2)
     ORDER BY created_at ASC LIMIT 1`,
    [offerId, ["confirmed", "reveal_pending", "contacts_revealed", "awaiting_confirmation"]]
  );
  if (active.rows[0]) return active.rows[0];
  const next = await pool.query(
    `SELECT * FROM projection.deals
     WHERE offer_id = $1 AND status = 'interest_sent'
     ORDER BY created_at ASC LIMIT 1`,
    [offerId]
  );
  return next.rows[0] || null;
}

async function promoteNext(offerId: string) {
  const next = await pool.query(
    `SELECT deal_id, owner_id FROM projection.deals
     WHERE offer_id = $1 AND status = 'interest_sent'
     ORDER BY created_at ASC LIMIT 1`,
    [offerId]
  );
  if (next.rows[0]) {
    await notify(next.rows[0].owner_id, "candidate_ready", next.rows[0].deal_id, offerId);
  }
}

export async function createInterest(offerId: string, responderId: string) {
  const offer = await getOffer(offerId);
  if (!offer) throw new Error("Оффер не найден");
  if (offer.participant_id === responderId) {
    throw new Error("Нельзя откликнуться на собственный ордер");
  }
  const cnt = await pool.query(
    `SELECT COUNT(*)::int AS c FROM projection.deals
     WHERE offer_id = $1 AND status = ANY($2)`,
    [offerId, ACTIVE_STATUSES]
  );
  if (cnt.rows[0].c >= DEAL_LIMIT) {
    throw new Error("Приём откликов по этому ордеру закрыт");
  }
  const pos = await pool.query(
    `SELECT COUNT(*)::int AS c FROM projection.deals WHERE offer_id = $1`,
    [offerId]
  );
  try {
    const r = await pool.query(
      `INSERT INTO projection.deals
         (offer_id, owner_id, responder_id, status, queue_position)
       VALUES ($1, $2, $3, 'interest_sent', $4)
       RETURNING deal_id`,
      [offerId, offer.participant_id, responderId, pos.rows[0].c + 1]
    );
    const cur = await currentDealRow(offerId);
    if (cur && cur.deal_id === r.rows[0].deal_id) {
      await notify(offer.participant_id, "new_interest", r.rows[0].deal_id, offerId);
    }
    return { deal_id: r.rows[0].deal_id };
  } catch (e: any) {
    if (e && e.code === "23505") {
      throw new Error("Вы уже откликнулись на этот ордер");
    }
    throw e;
  }
}

export async function currentCandidate(offerId: string, ownerId: string) {
  const offer = await getOffer(offerId);
  if (!offer) throw new Error("Оффер не найден");
  if (offer.participant_id !== ownerId) throw new Error("Нет доступа");
  const d = await currentDealRow(offerId);
  if (!d) return { candidate: null };
  const responder = await getParticipant(d.responder_id);
  return {
    candidate: {
      deal_id: d.deal_id,
      status: d.status,
      counterparty: counterpartyFacts(responder),
      offer_snapshot: offerSnapshot(offer),
    },
  };
}

export async function respondToCandidate(dealId: string, ownerId: string, action: string) {
  const r = await pool.query(`SELECT * FROM projection.deals WHERE deal_id = $1`, [dealId]);
  const d = r.rows[0];
  if (!d) throw new Error("Сделка не найдена");
  if (d.owner_id !== ownerId) throw new Error("Нет доступа");
  if (d.status !== "interest_sent") throw new Error("Кандидат уже обработан");

  if (action === "confirm") {
    await pool.query(
      `UPDATE projection.deals SET status = 'confirmed', is_active = true, responded_at = now()
       WHERE deal_id = $1`,
      [dealId]
    );
    await notify(d.responder_id, "confirmed", dealId, d.offer_id);
    return { status: "confirmed" };
  } else if (action === "decline") {
    await pool.query(
      `UPDATE projection.deals SET status = 'declined', is_active = false WHERE deal_id = $1`,
      [dealId]
    );
    await notify(d.responder_id, "declined", dealId, d.offer_id);
    await promoteNext(d.offer_id);
    return { status: "declined" };
  }
  throw new Error("Неизвестное действие");
}

export async function revealContacts(dealId: string, userId: string) {
  const r = await pool.query(`SELECT * FROM projection.deals WHERE deal_id = $1`, [dealId]);
  const d = r.rows[0];
  if (!d) throw new Error("Сделка не найдена");
  if (d.owner_id !== userId && d.responder_id !== userId) throw new Error("Нет доступа");
  if (!["confirmed", "reveal_pending"].includes(d.status)) {
    throw new Error("Раскрытие недоступно в текущем статусе");
  }
  const isOwner = d.owner_id === userId;
  const field = isOwner ? "owner_reveal" : "responder_reveal";
  await pool.query(`UPDATE projection.deals SET ${field} = true WHERE deal_id = $1`, [dealId]);

  const upd = await pool.query(`SELECT * FROM projection.deals WHERE deal_id = $1`, [dealId]);
  const nd = upd.rows[0];
  if (nd.owner_reveal && nd.responder_reveal) {
    await pool.query(
      `UPDATE projection.deals SET status = 'contacts_revealed', revealed_at = now() WHERE deal_id = $1`,
      [dealId]
    );
    await notify(d.owner_id, "revealed", dealId, d.offer_id);
    await notify(d.responder_id, "revealed", dealId, d.offer_id);
    return { status: "contacts_revealed" };
  } else {
    await pool.query(`UPDATE projection.deals SET status = 'reveal_pending' WHERE deal_id = $1`, [dealId]);
    const other = isOwner ? d.responder_id : d.owner_id;
    await notify(other, "reveal_request", dealId, d.offer_id);
    return { status: "reveal_pending" };
  }
}

export async function getContacts(dealId: string, userId: string) {
  const r = await pool.query(`SELECT * FROM projection.deals WHERE deal_id = $1`, [dealId]);
  const d = r.rows[0];
  if (!d) throw new Error("Сделка не найдена");
  if (d.owner_id !== userId && d.responder_id !== userId) throw new Error("Нет доступа");
  if (!["contacts_revealed", "awaiting_confirmation", "completed"].includes(d.status)) {
    throw new Error("Контакты ещё не раскрыты");
  }
  const otherId = d.owner_id === userId ? d.responder_id : d.owner_id;
  const p = await getParticipant(otherId);
  if (!p) throw new Error("Контрагент не найден");
  return {
    contacts: {
      company: p.company_name,
      contact_person: p.contact_person,
      phone: p.phone,
      email: p.email,
    },
  };
}

export async function setResult(dealId: string, userId: string, result: string) {
  const r = await pool.query(`SELECT * FROM projection.deals WHERE deal_id = $1`, [dealId]);
  const d = r.rows[0];
  if (!d) throw new Error("Сделка не найдена");
  if (d.owner_id !== userId && d.responder_id !== userId) throw new Error("Нет доступа");
  const isOwner = d.owner_id === userId;
  const field = isOwner ? "owner_result" : "responder_result";

  if (result === "cancelled") {
    await pool.query(
      `UPDATE projection.deals SET ${field} = 'cancelled', status = 'cancelled', is_active = false, closed_at = now()
       WHERE deal_id = $1`,
      [dealId]
    );
    const other = isOwner ? d.responder_id : d.owner_id;
    await notify(other, "cancelled", dealId, d.offer_id);
    await promoteNext(d.offer_id);
    return { status: "cancelled" };
  }

  if (result === "completed") {
    await pool.query(`UPDATE projection.deals SET ${field} = 'completed' WHERE deal_id = $1`, [dealId]);
    const upd = await pool.query(`SELECT * FROM projection.deals WHERE deal_id = $1`, [dealId]);
    const nd = upd.rows[0];
    if (nd.owner_result === "completed" && nd.responder_result === "completed") {
      await pool.query(
        `UPDATE projection.deals SET status = 'completed', is_active = false, closed_at = now() WHERE deal_id = $1`,
        [dealId]
      );
      await pool.query(
        `UPDATE projection.participants SET deals_completed = COALESCE(deals_completed,0) + 1
         WHERE participant_id = ANY($1)`,
        [[d.owner_id, d.responder_id]]
      );
      await pool.query(
        `UPDATE projection.deals SET status = 'expired_queue'
         WHERE offer_id = $1 AND status = 'interest_sent'`,
        [d.offer_id]
      );
      await pool.query(
        `UPDATE projection.offers_state SET status = 'executed' WHERE offer_id = $1`,
        [d.offer_id]
      );
      await notify(d.owner_id, "completed", dealId, d.offer_id);
      await notify(d.responder_id, "completed", dealId, d.offer_id);
      return { status: "completed" };
    } else {
      await pool.query(`UPDATE projection.deals SET status = 'awaiting_confirmation' WHERE deal_id = $1`, [dealId]);
      const other = isOwner ? d.responder_id : d.owner_id;
      await notify(other, "result_pending", dealId, d.offer_id);
      return { status: "awaiting_confirmation" };
    }
  }
  throw new Error("Неизвестный результат");
}

export async function listMyDeals(userId: string) {
  const r = await pool.query(
    `SELECT d.*, o.metal, o.purity, o.side, o.price_rub_per_gram, o.volume_grams,
            o.region, o.vat_mode, o.urgency, o.metal_form, o.item_category
     FROM projection.deals d
     JOIN projection.offers_state o ON d.offer_id = o.offer_id
     WHERE d.owner_id = $1 OR d.responder_id = $1
     ORDER BY d.created_at DESC`,
    [userId]
  );
  const out = [];
  for (const d of r.rows) {
    const isOwner = d.owner_id === userId;
    const otherId = isOwner ? d.responder_id : d.owner_id;
    const other = await getParticipant(otherId);
    let contacts = null;
    if (["contacts_revealed", "awaiting_confirmation", "completed"].includes(d.status) && other) {
      contacts = {
        company: other.company_name,
        contact_person: other.contact_person,
        phone: other.phone,
        email: other.email,
      };
    }
    out.push({
      deal_id: d.deal_id,
      offer_id: d.offer_id,
      role: isOwner ? "owner" : "responder",
      status: d.status,
      counterparty: counterpartyFacts(other),
      offer_snapshot: offerSnapshot(d),
      owner_reveal: d.owner_reveal,
      responder_reveal: d.responder_reveal,
      contacts,
      created_at: d.created_at,
    });
  }
  return out;
}

export async function listNotifications(userId: string) {
  const r = await pool.query(
    `SELECT notif_id, type, deal_id, offer_id, is_read, created_at
     FROM projection.notifications
     WHERE participant_id = $1
     ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  const TEXTS: Record<string, string> = {
    new_interest: "По вашему ордеру есть новый интерес",
    candidate_ready: "По вашему ордеру готов следующий кандидат",
    confirmed: "Владелец подтвердил ваш интерес — начаты переговоры",
    declined: "Владелец отклонил ваш интерес",
    reveal_request: "Контрагент готов открыть контакты — подтвердите со своей стороны",
    revealed: "Контакты раскрыты обеим сторонам",
    result_pending: "Контрагент отметил сделку — подтвердите исход",
    completed: "Сделка состоялась",
    cancelled: "Сделка не состоялась",
  };
  return r.rows.map((n) => ({
    notif_id: n.notif_id,
    type: n.type,
    deal_id: n.deal_id,
    offer_id: n.offer_id,
    is_read: n.is_read,
    created_at: n.created_at,
    text: TEXTS[n.type] || "Уведомление",
  }));
}

export async function markNotificationRead(notifId: string, userId: string) {
  await pool.query(
    `UPDATE projection.notifications SET is_read = true
     WHERE notif_id = $1 AND participant_id = $2`,
    [notifId, userId]
  );
  return { ok: true };
}
