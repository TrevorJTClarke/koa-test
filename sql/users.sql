------------------------------------------------------------
-- Creates admin user, password is 'secret'
------------------------------------------------------------

INSERT INTO users (first_name, role, email, mask) VALUES
 ('admin', 'ADMIN', 'admin@here.com', '$2a$12$3InPKSvlWwgLHYVxvJpaMeXDZF/.hhoiYMv72xydoqm3Pg58Emrwm')
;

------------------------------------------------------------
-- Create some users, password is always 'secret'
------------------------------------------------------------

INSERT INTO users (first_name, last_name, email, mask)
  SELECT
    'first-' || x.id,
    'last-' || x.id + 100,
    'user@here.com',
    '$2a$12$3InPKSvlWwgLHYVxvJpaMeXDZF/.hhoiYMv72xydoqm3Pg58Emrwm'
  FROM generate_series(1, 10) AS x(id)
;
