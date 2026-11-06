CREATE TABLE IF NOT EXISTS auth_throttles (
    throttle_key TEXT PRIMARY KEY,
    failure_count INTEGER NOT NULL DEFAULT 0,
    window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    blocked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS auth_throttles_blocked_until_idx
    ON auth_throttles(blocked_until);

CREATE INDEX IF NOT EXISTS auth_throttles_updated_at_idx
    ON auth_throttles(updated_at);
