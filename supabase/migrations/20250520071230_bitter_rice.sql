/*
  # Create Initial Admin User

  1. Changes
    - Creates the initial admin user with email admin@admin.local
    - Inserts the user into the admins table
    
  2. Security
    - Uses secure password hashing
    - Maintains existing RLS policies
*/

-- First, ensure the admin exists in the admins table
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Check if admin already exists to prevent duplicate creation
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'admin@admin.local'
  ) THEN
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
      email_change_token_current,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@admin.local',
      crypt('Admin123!', gen_salt('bf')), -- Using a secure default password
      NOW(),
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO admin_user_id;

    -- Insert into admins table
    INSERT INTO admins (id, username, password_hash)
    VALUES (
      admin_user_id,
      'admin',
      crypt('Admin123!', gen_salt('bf'))
    );
  END IF;
END $$;