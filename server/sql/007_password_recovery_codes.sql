-- One-time recovery codes: let someone who forgot their password set a new one
-- without an email provider. Only hashes are stored; each code works once.
CREATE TABLE IF NOT EXISTS password_recovery_codes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code_hash TEXT NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS password_recovery_codes_user_idx
ON password_recovery_codes(user_id);
