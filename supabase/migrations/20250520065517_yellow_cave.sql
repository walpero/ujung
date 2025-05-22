/*
  # Create admin user with proper authentication

  1. Changes
    - Create admin user in auth.users table
    - Create corresponding entry in admins table
    - Set up proper password hashing
    
  2. Security
    - Use secure password hashing
    - Ensure proper role assignment
*/

-- First, create the admin user in auth.users
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
  'ad4c96c0-9b7d-4c2e-8811-8f5c0f957726',  -- Fixed UUID for admin
  'admin@admin.local',
  crypt('admin123', gen_salt('bf')),  -- Using Blowfish encryption
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  true,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Then create the corresponding admin in admins table
INSERT INTO admins (
  id,
  username,
  password_hash,
  created_at
) VALUES (
  'ad4c96c0-9b7d-4c2e-8811-8f5c0f957726',  -- Same UUID as auth.users
  'admin',
  crypt('admin123', gen_salt('bf')),
  now()
) ON CONFLICT (id) DO NOTHING;