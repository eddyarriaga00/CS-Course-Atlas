ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS avatar_url TEXT;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS social_handle TEXT;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS status_text TEXT;

ALTER TABLE user_profiles
    ADD COLUMN IF NOT EXISTS messaging_enabled BOOLEAN NOT NULL DEFAULT FALSE;
