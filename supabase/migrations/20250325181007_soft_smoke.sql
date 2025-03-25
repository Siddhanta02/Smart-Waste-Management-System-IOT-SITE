/*
  # Update complaints system with admin controls

  1. Changes
    - Add admin role check function
    - Update complaint policies to allow admin access
    - Add policy for admin status updates
*/

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

-- Update existing policies
DROP POLICY IF EXISTS "Users can read their own complaints" ON complaints;
DROP POLICY IF EXISTS "Public can read all complaints" ON complaints;

-- Create new policies
CREATE POLICY "Anyone can view complaints"
ON complaints FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can create complaints"
ON complaints FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update complaint status"
ON complaints FOR UPDATE
TO public
USING (is_admin())
WITH CHECK (is_admin());