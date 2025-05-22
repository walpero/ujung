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
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin@airdrops-hunter.cloud',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  '',
  now(),
  '',
  now(),
  '',
  '',
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  true,
  now(),
  now(),
  null,
  null,
  '',
  '',
  now(),
  '',
  0,
  null,
  '',
  now()
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