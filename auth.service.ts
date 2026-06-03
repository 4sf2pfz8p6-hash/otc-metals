import bcrypt from "bcrypt";
import { pool } from "./db";

export type RegisterInput = {
  company_name: string;
  inn?: string;
  contact_person?: string;
  phone?: string;
  email: string;
  password: string;
  participant_type: string;
  region?: string;
};

export async function registerParticipant(input: RegisterInput) {
  const passwordHash = await bcrypt.hash(input.password, 10);
  const r = await pool.query(
    `INSERT INTO projection.participants (
       company_name, inn, contact_person, phone, email, password_hash,
       participant_type, region, status
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
     RETURNING participant_id`,
    [
      input.company_name,
      input.inn ?? null,
      input.contact_person ?? null,
      input.phone ?? null,
      input.email.trim().toLowerCase(),
      passwordHash,
      input.participant_type,
      input.region ?? null,
    ]
  );
  return { participant_id: r.rows[0].participant_id as string };
}

export async function loginParticipant(email: string, password: string) {
  const r = await pool.query(
    `SELECT participant_id, company_name, inn, contact_person, phone, email,
            password_hash, participant_type, region, status, rating,
            deals_completed, deals_cancelled, created_at
     FROM projection.participants
     WHERE email = $1`,
    [email.trim().toLowerCase()]
  );
  if (r.rows.length === 0) return null;

  const row = r.rows[0];
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return null;

  const { password_hash: _removed, ...participant } = row;
  return participant;
}

export function isUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}
