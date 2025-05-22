/*
  # Update Admin User Credentials

  1. Changes
    - Updates admin email to asuszenfonelivae3@gmail.com
    - Updates admin password to @Bagong07
    
  2. Security
    - Uses secure password hashing
    - Maintains existing security policies
*/

-- Update the admin user in auth.users
UPDATE auth.users
SET 
  email = 'asuszenfonelivae3@gmail.com',
  encrypted_password = crypt('@Bagong07', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'admin@admin.local';

-- Update the admin in admins table
UPDATE admins
SET 
  username = 'asuszenfonelivae3@gmail.com',
  password_hash = crypt('@Bagong07', gen_salt('bf'))
WHERE username = 'admin';