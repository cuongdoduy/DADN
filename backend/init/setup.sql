DO $$ BEGIN IF NOT EXISTS (
  SELECT
  FROM
    pg_database
  WHERE
    datname = 'smart-home-db'
) THEN CREATE DATABASE "smart-home-db";

END IF;

END $$;

CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY,
  "first_name" varchar(50),
  "last_name" varchar(50),
  "user_name" varchar(50),
  "email" varchar(50),  
  "created_at" timestamp
);
