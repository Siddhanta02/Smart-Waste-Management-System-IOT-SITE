/*
  # Add email column to users table

  1. Changes
    - Add email column to users table
    - Make email column unique and not nullable
    - Add index on email column for faster lookups

  2. Security
    - No changes to RLS policies
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users ADD COLUMN email text NOT NULL;
    ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
    CREATE INDEX users_email_idx ON users (email);
  END IF;
END $$;