/*
  # Fix users policy infinite recursion

  1. Changes
    - Remove recursive policy that was causing infinite loops
    - Add proper policies for user access
*/

-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins have full access" ON public.users;

-- Create new, non-recursive policies
CREATE POLICY "Enable read access for all users" ON public.users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE
  TO public
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = id);