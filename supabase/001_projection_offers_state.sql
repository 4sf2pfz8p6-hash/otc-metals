-- Применение: DATABASE_URL='postgresql://...' npm run migrate
CREATE SCHEMA IF NOT EXISTS projection;

CREATE TABLE IF NOT EXISTS projection.offers_state (
  offer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metal TEXT NOT NULL,
  side TEXT NOT NULL,
  price_rub_per_gram NUMERIC(18,4) NOT NULL,
  volume_grams NUMERIC(18,4) NOT NULL,
  region TEXT,
  purity TEXT,
  participant_type TEXT,
  rating INTEGER DEFAULT 90,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS offers_state_status_created_idx
  ON projection.offers_state (status, created_at DESC);
