CREATE TABLE IF NOT EXISTS oauth_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL CHECK (provider IN ('google', 'apple', 'github')),
    provider_subject TEXT NOT NULL,
    email TEXT,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    profile_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS oauth_identities_provider_subject_unique_idx
    ON oauth_identities (provider, provider_subject);

CREATE INDEX IF NOT EXISTS oauth_identities_user_idx
    ON oauth_identities (user_id);

CREATE INDEX IF NOT EXISTS oauth_identities_email_lower_idx
    ON oauth_identities ((LOWER(email)))
    WHERE email IS NOT NULL;
