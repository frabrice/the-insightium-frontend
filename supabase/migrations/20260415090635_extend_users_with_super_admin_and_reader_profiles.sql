/*
  # Extend users table with super_admin role and add reader profiles

  - Adds twitter, linkedin, specialty, auth_id columns to users
  - Updates role constraint to include super_admin
  - Creates reader_profiles table for public reader accounts
  - Creates bookmarks table for reader bookmarks
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'twitter') THEN
    ALTER TABLE users ADD COLUMN twitter text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'linkedin') THEN
    ALTER TABLE users ADD COLUMN linkedin text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'specialty') THEN
    ALTER TABLE users ADD COLUMN specialty text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'auth_id') THEN
    ALTER TABLE users ADD COLUMN auth_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role = ANY (ARRAY['super_admin'::text, 'admin'::text, 'editor'::text, 'author'::text]));

CREATE TABLE IF NOT EXISTS reader_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reader_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Readers can view all profiles" ON reader_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Readers can insert own profile" ON reader_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = auth_id);
CREATE POLICY "Readers can update own profile" ON reader_profiles FOR UPDATE TO authenticated USING (auth.uid() = auth_id) WITH CHECK (auth.uid() = auth_id);
CREATE POLICY "Readers can delete own profile" ON reader_profiles FOR DELETE TO authenticated USING (auth.uid() = auth_id);
CREATE POLICY "Public can view reader profiles" ON reader_profiles FOR SELECT TO anon USING (true);

CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reader_auth_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(reader_auth_id, article_id)
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Readers can view own bookmarks" ON bookmarks FOR SELECT TO authenticated USING (auth.uid() = reader_auth_id);
CREATE POLICY "Readers can insert own bookmarks" ON bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = reader_auth_id);
CREATE POLICY "Readers can delete own bookmarks" ON bookmarks FOR DELETE TO authenticated USING (auth.uid() = reader_auth_id);

DROP POLICY IF EXISTS "Allow admin read" ON users;
DROP POLICY IF EXISTS "Allow admin management" ON users;

CREATE POLICY "Public can view user profiles" ON users FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Authenticated can view users" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert users" ON users FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update users" ON users FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete users" ON users FOR DELETE TO authenticated USING (true);
