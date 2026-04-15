/*
  # Create Super Admin Account

  Creates the Supabase auth user for the super admin and links it to
  a users table entry with role = 'super_admin'.
*/

DO $$
DECLARE
  new_auth_id uuid;
BEGIN
  SELECT id INTO new_auth_id FROM auth.users WHERE email = 'admin@theinsightium.com';

  IF new_auth_id IS NULL THEN
    new_auth_id := gen_random_uuid();

    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud
    ) VALUES (
      new_auth_id,
      '00000000-0000-0000-0000-000000000000',
      'admin@theinsightium.com',
      crypt('Admin123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Super Admin"}',
      now(),
      now(),
      'authenticated',
      'authenticated'
    );

    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at,
      provider_id
    ) VALUES (
      gen_random_uuid(),
      new_auth_id,
      jsonb_build_object('sub', new_auth_id::text, 'email', 'admin@theinsightium.com'),
      'email',
      now(),
      now(),
      now(),
      new_auth_id::text
    );
  ELSE
    UPDATE auth.users
    SET encrypted_password = crypt('Admin123!', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE id = new_auth_id;
  END IF;

  INSERT INTO users (email, full_name, role, bio, is_active, auth_id)
  VALUES ('admin@theinsightium.com', 'Super Admin', 'super_admin', 'Platform Super Administrator', true, new_auth_id)
  ON CONFLICT (email) DO UPDATE
    SET role = 'super_admin',
        is_active = true,
        auth_id = new_auth_id,
        full_name = 'Super Admin',
        updated_at = now();
END $$;
