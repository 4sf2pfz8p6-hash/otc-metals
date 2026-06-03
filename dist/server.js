"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const offer_service_1 = require("./offer.service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.post("/offer/publish", async (req, res) => { const r = await offer_service_1.OfferService.publishOffer(req.body); res.status(r.ok ? 200 : 400).json(r); });
app.post("/offer/update", async (req, res) => { const r = await offer_service_1.OfferService.updateOffer(req.body); res.status(r.ok ? 200 : 400).json(r); });
app.post("/offer/withdraw", async (req, res) => { const r = await offer_service_1.OfferService.withdrawOffer(req.body.offerId); res.status(r.ok ? 200 : 400).json(r); });
app.get("/offers", async (_req, res) => {
    try {
        const r = await db_1.pool.query(`SELECT offer_id, metal, side, price_rub_per_gram, volume_grams, region, purity, participant_type, rating, status, created_at
       FROM projection.offers_state
       WHERE status = 'active'
       ORDER BY created_at DESC`);
        res.json(r.rows);
    }
    catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        console.error("GET /offers:", message);
        res.status(500).json({ error: message });
    }
});
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
