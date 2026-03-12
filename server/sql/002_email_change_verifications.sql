CREATE TABLE IF NOT EXISTS email_change_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    new_email TEXT NOT NULL,
    pin_hash TEXT NOT NULL,
    attempts SMALLINT NOT NULL DEFAULT 0,
    max_attempts SMALLINT NOT NULL DEFAULT 5,
    expires_at TIMESTAMPTZ NOT NULL,
    consumed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_change_verifications_user_idx
    ON email_change_verifications(user_id);

CREATE INDEX IF NOT EXISTS email_change_verifications_new_email_idx
    ON email_change_verifications((LOWER(new_email)));

CREATE INDEX IF NOT EXISTS email_change_verifications_expires_idx
    ON email_change_verifications(expires_at);

CREATE UNIQUE INDEX IF NOT EXISTS email_change_verifications_user_pending_unique_idx
    ON email_change_verifications(user_id)
    WHERE consumed_at IS NULL;
