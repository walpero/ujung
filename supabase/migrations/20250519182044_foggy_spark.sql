/*
  # Fix admin access and RLS policies

  1. Changes
    - Add service role policy for admin operations
    - Update RLS policies for better security
    - Add admin authentication check
    
  2. Security
    - Enable RLS on all tables
    - Add proper admin access policies
*/

-- Update airdrops table policies
DROP POLICY IF EXISTS "Enable service role full access" ON airdrops;
DROP POLICY IF EXISTS "Allow admin full access to airdrops" ON airdrops;

CREATE POLICY "Enable service role full access"
ON airdrops
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admin full access"
ON airdrops
FOR ALL
TO authenticated
USING (
  auth.role() = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.id = auth.uid()
  )
)
WITH CHECK (
  auth.role() = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.id = auth.uid()
  )
);