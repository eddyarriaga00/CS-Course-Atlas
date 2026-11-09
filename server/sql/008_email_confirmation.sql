-- Confirmed email addresses, one-time emailed codes (sign-up confirmation and password
-- reset) and small encrypted settings the server keeps for itself (the Gmail sender token).
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;

-- People who signed in with Google already have an address Google confirmed.
UPDATE users u
SET email_verified_at = NOW()
WHERE u.email_verified_at IS NULL
  AND EXISTS (
      SELECT 1 FROM oauth_identities o
      WHERE o.user_id = u.id AND o.email_verified AND LOWER(o.email) = LOWER(u.email)
  );

CREATE TABLE IF NOT EXISTS email_codes (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    purpose TEXT NOT NULL CHECK (purpose IN ('confirm', 'reset')),
    email TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    sent_count INTEGER NOT NULL DEFAULT 1,
    window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (user_id, purpose)
);

CREATE TABLE IF NOT EXISTS app_secrets (
    name TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
