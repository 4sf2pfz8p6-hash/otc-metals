"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_service_1 = require("./auth.service");
const offers_service_1 = require("./offers.service");
const errors_1 = require("./errors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.post("/auth/register", async (req, res) => {
    try {
        const { company_name, inn, contact_person, phone, email, password, participant_type, region, } = req.body ?? {};
        if (!company_name || !email || !password || !participant_type) {
            return res.status(400).json({
                error: "Обязательны поля: company_name, email, password, participant_type",
            });
        }
        const result = await (0, auth_service_1.registerParticipant)({
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
    }
    catch (e) {
        (0, errors_1.sendError)(res, "POST /auth/register", e);
    }
});
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password) {
            return res.status(400).json({ error: "Укажите email и password" });
        }
        const participant = await (0, auth_service_1.loginParticipant)(email, password);
        if (!participant) {
            return res.status(401).json({ error: "Неверный email или пароль" });
        }
        res.json(participant);
    }
    catch (e) {
        (0, errors_1.sendError)(res, "POST /auth/login", e);
    }
});
app.get("/offers", async (_req, res) => {
    try {
        const rows = await (0, offers_service_1.listMarketOffers)();
        res.json(rows);
    }
    catch (e) {
        (0, errors_1.sendError)(res, "GET /offers", e);
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
                error: "Обязательны: participant_id, metal, side, price_rub_per_gram (или price), volume_grams (или volume)",
            });
        }
        const result = await (0, offers_service_1.publishOffer)({
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
    }
    catch (e) {
        const notFound = e instanceof Error && e.message.includes("не найден");
        (0, errors_1.sendError)(res, "POST /offer/publish", e, notFound ? 404 : 500);
    }
});
app.post("/offer/withdraw", async (req, res) => {
    try {
        const offerId = req.body?.offerId ?? req.body?.offer_id;
        if (!offerId) {
            return res.status(400).json({ error: "Укажите offerId" });
        }
        const result = await (0, offers_service_1.withdrawOffer)(offerId);
        res.json(result);
    }
    catch (e) {
        const msg = e instanceof Error ? e.message : "";
        (0, errors_1.sendError)(res, "POST /offer/withdraw", e, msg.includes("не найден") ? 404 : 500);
    }
});
app.get("/my-offers", async (req, res) => {
    try {
        const participant_id = req.query.participant_id;
        if (!participant_id || typeof participant_id !== "string") {
            return res.status(400).json({ error: "Укажите participant_id в query" });
        }
        const rows = await (0, offers_service_1.listMyOffers)(participant_id);
        res.json(rows);
    }
    catch (e) {
        (0, errors_1.sendError)(res, "GET /my-offers", e);
    }
});
const deals_service_1 = require("./deals.service");
app.post("/deal/interest", async (req, res) => { try {
    const { offer_id, participant_id } = req.body ?? {};
    if (!offer_id || !participant_id)
        return res.status(400).json({ ok: false, error: "need offer_id and participant_id" });
    const r = await (0, deals_service_1.createInterest)(offer_id, participant_id);
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.get("/offer/current-candidate", async (req, res) => { try {
    const r = await (0, deals_service_1.currentCandidate)(String(req.query.offer_id || ""), String(req.query.participant_id || ""));
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.post("/deal/respond", async (req, res) => { try {
    const { deal_id, participant_id, action } = req.body ?? {};
    const r = await (0, deals_service_1.respondToCandidate)(deal_id, participant_id, action);
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.post("/deal/reveal", async (req, res) => { try {
    const { deal_id, participant_id } = req.body ?? {};
    const r = await (0, deals_service_1.revealContacts)(deal_id, participant_id);
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.get("/deal/contacts", async (req, res) => { try {
    const r = await (0, deals_service_1.getContacts)(String(req.query.deal_id || ""), String(req.query.participant_id || ""));
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.post("/deal/result", async (req, res) => { try {
    const { deal_id, participant_id, result } = req.body ?? {};
    const r = await (0, deals_service_1.setResult)(deal_id, participant_id, result);
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.get("/my-deals", async (req, res) => { try {
    const r = await (0, deals_service_1.listMyDeals)(String(req.query.participant_id || ""));
    res.json({ ok: true, deals: r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.get("/notifications", async (req, res) => { try {
    const r = await (0, deals_service_1.listNotifications)(String(req.query.participant_id || ""));
    res.json({ ok: true, notifications: r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
app.post("/notification/read", async (req, res) => { try {
    const { notif_id, participant_id } = req.body ?? {};
    const r = await (0, deals_service_1.markNotificationRead)(notif_id, participant_id);
    res.json({ ok: true, ...r });
}
catch (e) {
    res.status(400).json({ ok: false, error: e instanceof Error ? e.message : "err" });
} });
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
