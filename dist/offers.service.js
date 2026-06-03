"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishOffer = publishOffer;
exports.withdrawOffer = withdrawOffer;
exports.listMarketOffers = listMarketOffers;
exports.listMyOffers = listMyOffers;
const db_1 = require("./db");
async function publishOffer(input) {
    const p = await db_1.pool.query(`SELECT participant_type, rating, status FROM projection.participants WHERE participant_id = $1`, [input.participant_id]);
    if (p.rows.length === 0) {
        throw new Error("Участник не найден");
    }
    if (p.rows[0].status !== "active" && p.rows[0].status !== "pending") {
        throw new Error("Участник не может публиковать офферы в текущем статусе");
    }
    const r = await db_1.pool.query(`INSERT INTO projection.offers_state (
       metal, side, price_rub_per_gram, volume_grams, region, purity,
       participant_id, vat_mode, urgency, metal_form, comment,
       participant_type, rating, status
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'active')
     RETURNING offer_id`, [
        input.metal,
        input.side,
        input.price_rub_per_gram,
        input.volume_grams,
        input.region ?? null,
        input.purity ?? null,
        input.participant_id,
        input.vat_mode ?? null,
        input.urgency ?? null,
        input.metal_form ?? null,
        input.comment ?? null,
        p.rows[0].participant_type,
        p.rows[0].rating ?? 90,
    ]);
    return { offer_id: r.rows[0].offer_id };
}
async function withdrawOffer(offerId) {
    const r = await db_1.pool.query(`UPDATE projection.offers_state SET status = 'withdrawn'
     WHERE offer_id = $1 AND status = 'active'
     RETURNING offer_id`, [offerId]);
    if (r.rowCount === 0) {
        throw new Error("Оффер не найден или уже снят");
    }
    return { offer_id: offerId };
}
async function listMarketOffers() {
    const r = await db_1.pool.query(`SELECT o.offer_id, o.metal, o.side, o.price_rub_per_gram, o.volume_grams,
            o.region, o.purity, o.vat_mode, o.urgency, o.metal_form, o.comment,
            o.status, o.created_at,
            p.participant_type, p.rating, p.deals_completed
     FROM projection.offers_state o
     LEFT JOIN projection.participants p ON o.participant_id = p.participant_id
     WHERE o.status = 'active'
     ORDER BY o.created_at DESC`);
    return r.rows;
}
async function listMyOffers(participantId) {
    const r = await db_1.pool.query(`SELECT o.*, p.company_name, p.email, p.phone
     FROM projection.offers_state o
     LEFT JOIN projection.participants p ON o.participant_id = p.participant_id
     WHERE o.participant_id = $1
     ORDER BY o.created_at DESC`, [participantId]);
    return r.rows;
}
