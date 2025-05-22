/*
  # Create Default Admin User
  
  1. Changes
    - Creates default admin user with username 'admin'
    - Sets up corresponding auth user
    
  2. Security
    - Uses secure password hashing
    - Sets up proper authentication
*/

-- Create admin user if it doesn't exist
DO $$
BEGIN
  -- First ensure the admin exists in auth.users
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'admin@admin.local'
  ) THEN
    -- Create auth user
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
    );
  END IF;

  -- Then ensure admin exists in admins table
  IF NOT EXISTS (
    SELECT 1 FROM admins 
    WHERE username = 'admin'
  ) THEN
    INSERT INTO admins (
      username,
      password_hash
    ) VALUES (
      'admin',
      crypt('admin123', gen_salt('bf'))
    );
  END IF;
END $$;