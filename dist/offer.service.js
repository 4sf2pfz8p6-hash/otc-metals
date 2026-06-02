"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const db_1 = require("./db");
class OfferService {
    static async publishOffer(i) {
        try {
            const r = await db_1.pool.query(`SELECT api.publish_offer($1,$2,$3,$4) AS version`, [i.offerId, i.metal, i.price, i.volume]);
            return { ok: true, version: r.rows[0].version };
        }
        catch (e) {
            return { ok: false, error: e.message };
        }
    }
    static async updateOffer(i) {
        try {
            const r = await db_1.pool.query(`SELECT api.update_offer($1,$2,$3) AS version`, [i.offerId, i.price ?? null, i.volume ?? null]);
            return { ok: true, version: r.rows[0].version };
        }
        catch (e) {
            return { ok: false, error: e.message };
        }
    }
    static async withdrawOffer(offerId) {
        try {
            const r = await db_1.pool.query(`SELECT api.withdraw_offer($1) AS version`, [offerId]);
            return { ok: true, version: r.rows[0].version };
        }
        catch (e) {
            return { ok: false, error: e.message };
        }
    }
}
exports.OfferService = OfferService;
