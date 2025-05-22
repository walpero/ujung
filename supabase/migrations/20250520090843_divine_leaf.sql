/*
  # Create Initial Admin User

  1. Changes
    - Add initial admin user with username 'admin'
    - Password will be 'admin123' (this should be changed after first login)
    
  2. Security
    - Password is stored as a hash
    - Admin user will have full access to manage the system
*/

-- Insert initial admin user
INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  -- This is a secure hash of 'admin123'
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQN2YIpjnGFO'
) ON CONFLICT (username) DO NOTHING;