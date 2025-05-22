/*
  # Add initial admin user

  1. Changes
    - Add initial admin user with username 'admin'
    - Password hash is for the password 'admin123' (this should be changed after first login)
    
  2. Security
    - Uses secure password hashing
    - Maintains existing RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM admins WHERE username = 'admin'
  ) THEN
    INSERT INTO admins (username, password_hash)
    VALUES (
      'admin',
      -- This is a secure hash for 'admin123' - should be changed after first login
      '$2a$10$RgZM5fXAx6M12H4NGYmTBOsKyVH6GXXrKQnqYqvO.ZEZ9z7jPAWxK'
    );
  END IF;
END $$;