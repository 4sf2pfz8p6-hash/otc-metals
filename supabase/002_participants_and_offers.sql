CREATE TABLE IF NOT EXISTS projection.participants (
  participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  inn TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  participant_type TEXT NOT NULL,
  region TEXT,
  status TEXT DEFAULT 'pending',
  rating INTEGER DEFAULT 90,
  deals_completed INTEGER DEFAULT 0,
  deals_cancelled INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projection.offers_state ADD COLUMN IF NOT EXISTS participant_id UUID;
ALTER TABLE projection.offers_state ADD COLUMN IF NOT EXISTS vat_mode TEXT;
ALTER TABLE projection.offers_state ADD COLUMN IF NOT EXISTS urgency TEXT;
ALTER TABLE projection.offers_state ADD COLUMN IF NOT EXISTS metal_form TEXT;
ALTER TABLE projection.offers_state ADD COLUMN IF NOT EXISTS comment TEXT;

CREATE INDEX IF NOT EXISTS offers_state_participant_id_idx
  ON projection.offers_state (participant_id);
