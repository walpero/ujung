/*
  # Fix RLS policies for airdrops table

  1. Changes
    - Drop existing RLS policies for airdrops table
    - Create new policies that properly handle admin access
    - Add policy for service role access
    
  2. Security
    - Enable RLS on airdrops table
    - Add policy for admin users to have full access
    - Add policy for public read access
    - Add policy for service role full access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin full access to airdrops" ON airdrops;
DROP POLICY IF EXISTS "Allow public read access" ON airdrops;
DROP POLICY IF EXISTS "Allow service role to create, update, delete" ON airdrops;

-- Ensure RLS is enabled
ALTER TABLE airdrops ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Allow admin full access to airdrops"
ON airdrops
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.id = auth.uid()
  )
);

CREATE POLICY "Allow public read access"
ON airdrops
FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable service role full access"
ON airdrops
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);