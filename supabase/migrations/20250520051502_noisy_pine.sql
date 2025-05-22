/*
  # Create initial admin user

  1. Changes
    - Insert initial admin user with email and password
    - Add necessary data to auth.users table
    
  2. Security
    - Password will be hashed using Supabase auth
*/

-- Insert into auth.users first
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@airdrops-hunter.cloud',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  true,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Then insert into admins table
INSERT INTO admins (
  id,
  username,
  password_hash,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@airdrops-hunter.cloud',
  crypt('admin123', gen_salt('bf')),
  now()
) ON CONFLICT (id) DO NOTHING;