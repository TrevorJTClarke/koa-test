DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

------------------------------------------------------------
------------------------------------------------------------

CREATE TYPE user_role AS ENUM ('ADMIN', 'OWNER', 'MEMBER', 'BANNED');

CREATE TABLE users (
  id             serial PRIMARY KEY,
  first_name     text NOT NULL,
  last_name      text NULL,
  role           user_role NOT NULL DEFAULT 'OWNER'::user_role,
  email          text NOT NULL,
  mask           text NOT NULL,
  last_login_at  timestamptz NOT NULL DEFAULT NOW(),
  created_at     timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up lower(email) lookup
CREATE INDEX lower_email ON users (lower(email));

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE sessions (
  id            uuid PRIMARY KEY,
  user_id       int  NOT NULL REFERENCES users(id),
  ip_address    inet NOT NULL,
  user_agent    text NULL,
  expired_at    timestamptz NOT NULL DEFAULT NOW() + INTERVAL '4 weeks',
  created_at    timestamptz NOT NULL DEFAULT NOW()
);

-- Speed up user_id FK joins
CREATE INDEX sessions__user_id ON sessions (user_id);

CREATE VIEW active_sessions AS
  SELECT *
  FROM sessions
  WHERE expired_at > NOW()
;

------------------------------------------------------------
------------------------------------------------------------

CREATE TABLE masks (
  user_id       int PRIMARY KEY NOT NULL REFERENCES users(id),
  email         text NOT NULL,
  mask          text NOT NULL
);

-- Speed up user_id FK joins
CREATE INDEX masks__user_id ON masks (user_id);
