/*
  # Update Admin Role and Policies

  1. Changes
    - Update admin role using auth.users join
    - Add admin-specific policies for complaints and drivers
    
  2. Security
    - Policies for admin access to complaints
    - Policies for admin access to drivers
*/

-- Update the role of the admin user by joining with auth.users
UPDATE public.users
SET role = 'admin'
FROM auth.users
WHERE auth.users.email = 'admin@recyclean.com'
AND public.users.id = auth.users.id;

-- Create admin-specific policies
CREATE POLICY "Admins can update any complaint"
ON complaints
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can read all complaints"
ON complaints
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can manage drivers"
ON drivers
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);