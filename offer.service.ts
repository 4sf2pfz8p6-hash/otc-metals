import { pool } from "./db";
type Result = { ok: true; version: any } | { ok: false; error: string };
export class OfferService {
  static async publishOffer(i: { offerId: string; metal: string; price: number; volume: number }): Promise<Result> {
    try { const r = await pool.query(`SELECT api.publish_offer($1,$2,$3,$4) AS version`, [i.offerId, i.metal, i.price, i.volume]); return { ok: true, version: r.rows[0].version }; }
    catch (e: any) { return { ok: false, error: e.message }; }
  }
  static async updateOffer(i: { offerId: string; price?: number; volume?: number }): Promise<Result> {
    try { const r = await pool.query(`SELECT api.update_offer($1,$2,$3) AS version`, [i.offerId, i.price ?? null, i.volume ?? null]); return { ok: true, version: r.rows[0].version }; }
    catch (e: any) { return { ok: false, error: e.message }; }
  }
  static async withdrawOffer(offerId: string): Promise<Result> {
    try { const r = await pool.query(`SELECT api.withdraw_offer($1) AS version`, [offerId]); return { ok: true, version: r.rows[0].version }; }
    catch (e: any) { return { ok: false, error: e.message }; }
  }
}
