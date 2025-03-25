/*
  # Create Admin User

  This migration updates the role of the admin user to 'admin'.
  
  Changes:
  - Updates the role of admin@recyclean.com to 'admin'
  - Adds admin-specific policies for managing complaints and drivers
*/

-- Update the role of the admin user
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@recyclean.com';

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