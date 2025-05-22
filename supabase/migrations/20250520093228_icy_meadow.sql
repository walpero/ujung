/*
  # Create Default Admin User

  1. Changes
    - Creates default admin user with username 'admin'
    - Sets up corresponding auth user
    
  2. Security
    - Uses secure password hashing
    - Sets up proper authentication
*/

-- First clean up any existing admin users
DELETE FROM auth.users WHERE email = 'admin@admin.local';
DELETE FROM admins WHERE username = 'admin';

DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Create the admin user in auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@admin.local',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    ''
  )
  RETURNING id INTO admin_user_id;

  -- Insert into admins table using the generated user id
  INSERT INTO admins (
    id,
    username,
    password_hash
  )
  VALUES (
    admin_user_id,
    'admin',
    crypt('admin123', gen_salt('bf'))
  );
END $$;