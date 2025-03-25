/*
  # Restore Core Schema

  1. New Tables
    - users
      - Basic user profile information
      - Role-based access control
    - complaints
      - User-submitted complaints
      - Status tracking
      - Location information

  2. Security
    - Enable RLS on all tables
    - Policies for user access
    - Admin role functionality
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing types if they exist
DROP TYPE IF EXISTS complaint_status CASCADE;

-- Create custom types
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved');

-- Drop existing tables if they exist
DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  full_name text,
  phone text,
  address text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  status complaint_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM public.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for complaints table
CREATE POLICY "Anyone can view complaints"
  ON complaints FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create complaints"
  ON complaints FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own complaints"
  ON complaints FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    (SELECT role = 'admin' FROM users WHERE id = auth.uid())
  );

-- Insert sample complaints
INSERT INTO complaints (title, description, location, status)
VALUES
  ('Overflowing Garbage Bin', 'The garbage bin near Central Park is overflowing', 'Central Park', 'pending'),
  ('Illegal Dumping', 'Construction waste dumped on Park Road', 'Park Road', 'in_progress'),
  ('Missed Collection', 'Waste not collected for 3 days', 'Green Valley', 'pending');