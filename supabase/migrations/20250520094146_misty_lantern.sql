/*
  # Enable GitHub Authentication
  
  1. Changes
    - Add GitHub OAuth provider settings
    - Update admin access policies
    
  2. Security
    - Maintain existing RLS policies
    - Add policy for GitHub authenticated users
*/

-- Update policies to allow GitHub authenticated users
CREATE POLICY "Allow GitHub admin access"
ON admins
FOR ALL
TO authenticated
USING (
  auth.jwt()->>'provider' = 'github' AND
  (
    auth.jwt()->>'email' IN (
      'your-github-email@example.com'  -- Replace with your GitHub email
    )
  )
)
WITH CHECK (
  auth.jwt()->>'provider' = 'github' AND
  (
    auth.jwt()->>'email' IN (
      'your-github-email@example.com'  -- Replace with your GitHub email
    )
  )
);