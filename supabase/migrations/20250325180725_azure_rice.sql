/*
  # Add RLS policies for complaints table

  1. Security
    - Enable RLS on complaints table
    - Add policies for:
      - Users can create their own complaints
      - Users can read their own complaints
      - Users can read all complaints (for public visibility)
*/

-- Enable RLS
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own complaints"
ON complaints
FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own complaints"
ON complaints
FOR SELECT
TO public
USING (auth.uid() = user_id);

CREATE POLICY "Public can read all complaints"
ON complaints
FOR SELECT
TO public
USING (true);