import express from "express";
import cors from "cors";
import path from "path";
import { pool } from "./db";
import { OfferService } from "./offer.service";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.post("/offer/publish", async (req, res) => { const r = await OfferService.publishOffer(req.body); res.status(r.ok ? 200 : 400).json(r); });
app.post("/offer/update", async (req, res) => { const r = await OfferService.updateOffer(req.body); res.status(r.ok ? 200 : 400).json(r); });
app.post("/offer/withdraw", async (req, res) => { const r = await OfferService.withdrawOffer(req.body.offerId); res.status(r.ok ? 200 : 400).json(r); });
app.get("/offers", async (_req, res) => {
  try {
    const r = await pool.query(
      `SELECT offer_id, metal, side, price_rub_per_gram, volume_grams, region, purity, participant_type, rating, status, created_at
       FROM projection.offers_state
       WHERE status = 'active'
       ORDER BY created_at DESC`
    );
    res.json(r.rows);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("GET /offers:", message);
    res.status(500).json({ error: message });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
