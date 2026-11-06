ALTER TABLE user_sessions
ADD COLUMN IF NOT EXISTS auth_provider TEXT NOT NULL DEFAULT 'password';

CREATE INDEX IF NOT EXISTS user_sessions_auth_provider_idx
ON user_sessions(auth_provider);
