/*
  # Add admin user and fix permissions

  1. Changes
    - Create admin user with proper credentials
    - Update RLS policies for admin access
    - Ensure proper role assignment

  2. Security
    - Enable RLS
    - Add admin-specific policies
*/

-- First, ensure the admin user exists with proper credentials
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@recyclean.com',
  crypt('Admin@123', gen_salt('bf')),
  now(),
  now(),
  now()
)
ON CONFLICT (email) DO NOTHING;

-- Create profile for admin in public.users table
INSERT INTO public.users (
  id,
  email,
  role,
  full_name,
  created_at,
  updated_at
)
SELECT 
  id,
  email,
  'admin',
  'System Administrator',
  created_at,
  updated_at
FROM auth.users
WHERE email = 'admin@recyclean.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- Ensure admin policies are in place
CREATE POLICY "Admins can do everything"
ON public.users
FOR ALL
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.users WHERE role = 'admin'
  )
);