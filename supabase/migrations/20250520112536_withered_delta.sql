/*
  # Add Push Subscriptions Table

  1. New Tables
    - `push_subscriptions`
      - `id` (uuid, primary key)
      - `subscription` (jsonb)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS
    - Add policy for public insertions
    - Add policy for service role access
*/

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public to subscribe
CREATE POLICY "Allow public to subscribe to push notifications"
  ON push_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Enable service role full access to push_subscriptions"
  ON push_subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);