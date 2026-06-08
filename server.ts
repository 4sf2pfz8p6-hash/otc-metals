import express from "express";
import cors from "cors";
import path from "path";
import { registerParticipant, loginParticipant } from "./auth.service";
import {
  listMarketOffers,
  listMyOffers,
  publishOffer,
  withdrawOffer,
} from "./offers.service";
import { sendError } from "./errors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/auth/register", async (req, res) => {
  try {
    const {
      company_name,
      inn,
      contact_person,
      phone,
      email,
      password,
      participant_type,
      region,
    } = req.body ?? {};
    if (!company_name || !email || !password || !participant_type) {
      return res.status(400).json({
        error: "Обязательны поля: company_name, email, password, participant_type",
      });
    }
    const result = await registerParticipant({
      company_name,
      inn,
      contact_person,
      phone,
      email,
      password,
      participant_type,
      region,
    });
    res.status(201).json(result);
  } catch (e) {
    sendError(res, "POST /auth/register", e);
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: "Укажите email и password" });
    }
    const participant = await loginParticipant(email, password);
    if (!participant) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }
    res.json(participant);
  } catch (e) {
    sendError(res, "POST /auth/login", e);
  }
});

app.get("/offers", async (_req, res) => {
  try {
    const rows = await listMarketOffers();
    res.json(rows);
  } catch (e) {
    sendError(res, "GET /offers", e);
  }
});

app.post("/offer/publish", async (req, res) => {
  try {
    const b = req.body ?? {};
    const participant_id = b.participant_id;
    const metal = b.metal;
    const side = b.side;
    const price_rub_per_gram = Number(b.price_rub_per_gram ?? b.price);
    const volume_grams = Number(b.volume_grams ?? b.volume);

    if (!participant_id || !metal || !side || !price_rub_per_gram || !volume_grams) {
      return res.status(400).json({
        error:
          "Обязательны: participant_id, metal, side, price_rub_per_gram (или price), volume_grams (или volume)",
      });
    }

    const result = await publishOffer({
      participant_id,
      metal,
      side,
      price_rub_per_gram,
      volume_grams,
      region: b.region,
      purity: b.purity,
      vat_mode: b.vat_mode,
      urgency: b.urgency,
      metal_form: b.metal_form,
      comment: b.comment,
    });
    res.status(201).json(result);
  } catch (e) {
    const notFound = e instanceof Error && e.message.includes("не найден");
    sendError(res, "POST /offer/publish", e, notFound ? 404 : 500);
  }
});

app.post("/offer/withdraw", async (req, res) => {
  try {
    const offerId = req.body?.offerId ?? req.body?.offer_id;
    if (!offerId) {
      return res.status(400).json({ error: "Укажите offerId" });
    }
    const result = await withdrawOffer(offerId);
    res.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    sendError(res, "POST /offer/withdraw", e, msg.includes("не найден") ? 404 : 500);
  }
});

app.get("/my-offers", async (req, res) => {
  try {
    const participant_id = req.query.participant_id;
    if (!participant_id || typeof participant_id !== "string") {
      return res.status(400).json({ error: "Укажите participant_id в query" });
    }
    const rows = await listMyOffers(participant_id);
    res.json(rows);
  } catch (e) {
    sendError(res, "GET /my-offers", e);
  }
});

import { createInterest, currentCandidate, respondToCandidate, revealContacts, getContacts, setResult, listMyDeals, listNotifications, markNotificationRead } from "./deals.service";
app.post("/deal/interest", async (req, res) => { try { const { offer_id, participant_id } = req.body ?? {}; if (!offer_id || !participant_id) return res.status(400).json({ ok:false, error:"need offer_id and participant_id" }); const r = await createInterest(offer_id, participant_id); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.get("/offer/current-candidate", async (req, res) => { try { const r = await currentCandidate(String(req.query.offer_id||""), String(req.query.participant_id||"")); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.post("/deal/respond", async (req, res) => { try { const { deal_id, participant_id, action } = req.body ?? {}; const r = await respondToCandidate(deal_id, participant_id, action); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.post("/deal/reveal", async (req, res) => { try { const { deal_id, participant_id } = req.body ?? {}; const r = await revealContacts(deal_id, participant_id); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.get("/deal/contacts", async (req, res) => { try { const r = await getContacts(String(req.query.deal_id||""), String(req.query.participant_id||"")); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.post("/deal/result", async (req, res) => { try { const { deal_id, participant_id, result } = req.body ?? {}; const r = await setResult(deal_id, participant_id, result); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.get("/my-deals", async (req, res) => { try { const r = await listMyDeals(String(req.query.participant_id||"")); res.json({ ok:true, deals: r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.get("/notifications", async (req, res) => { try { const r = await listNotifications(String(req.query.participant_id||"")); res.json({ ok:true, notifications: r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
app.post("/notification/read", async (req, res) => { try { const { notif_id, participant_id } = req.body ?? {}; const r = await markNotificationRead(notif_id, participant_id); res.json({ ok:true, ...r }); } catch (e) { res.status(400).json({ ok:false, error: e instanceof Error ? e.message : "err" }); } });
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
