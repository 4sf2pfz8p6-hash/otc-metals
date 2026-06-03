"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerParticipant = registerParticipant;
exports.loginParticipant = loginParticipant;
exports.isUniqueViolation = isUniqueViolation;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
async function registerParticipant(input) {
    const passwordHash = await bcrypt_1.default.hash(input.password, 10);
    const r = await db_1.pool.query(`INSERT INTO projection.participants (
       company_name, inn, contact_person, phone, email, password_hash,
       participant_type, region, status
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
     RETURNING participant_id`, [
        input.company_name,
        input.inn ?? null,
        input.contact_person ?? null,
        input.phone ?? null,
        input.email.trim().toLowerCase(),
        passwordHash,
        input.participant_type,
        input.region ?? null,
    ]);
    return { participant_id: r.rows[0].participant_id };
}
async function loginParticipant(email, password) {
    const r = await db_1.pool.query(`SELECT participant_id, company_name, inn, contact_person, phone, email,
            password_hash, participant_type, region, status, rating,
            deals_completed, deals_cancelled, created_at
     FROM projection.participants
     WHERE email = $1`, [email.trim().toLowerCase()]);
    if (r.rows.length === 0)
        return null;
    const row = r.rows[0];
    const ok = await bcrypt_1.default.compare(password, row.password_hash);
    if (!ok)
        return null;
    const { password_hash: _removed, ...participant } = row;
    return participant;
}
function isUniqueViolation(err) {
    return typeof err === "object" && err !== null && err.code === "23505";
}
