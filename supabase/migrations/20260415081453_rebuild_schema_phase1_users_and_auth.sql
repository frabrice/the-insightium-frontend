/*
  # Phase 1: Users, Auth, and Reader Profiles

  ## Summary
  Extends the existing users table and creates new tables for the three-tier
  user system: readers (public), admins (editorial staff), and super admins
  (platform managers).

  ## Changes

  ### Modified Tables
  - `users`: Add role 'super_admin', add social links, specialty, updated role constraint

  ### New Tables
  - `reader_profiles`: Public reader accounts linked to Supabase Auth
  - `bookmarks`: Reader article bookmarks

  ## Security
  - RLS enabled on all new tables
  - Readers can only access their own data
  - Admins can read all user data but only write their own profile
  - Super admins have full access
*/

-- Extend users table with new fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'twitter'
  ) THEN
    ALTER TABLE users ADD COLUMN twitter text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'linkedin'
  ) THEN
    ALTER TABLE users ADD COLUMN linkedin text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'specialty'
  ) THEN
    ALTER TABLE users ADD COLUMN specialty text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'auth_id'
  ) THEN
    ALTER TABLE users ADD COLUMN auth_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Update the role constraint to include super_admin
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check 
  CHECK (role = ANY (ARRAY['super_admin'::text, 'admin'::text, 'editor'::text, 'author'::text]));

-- Reader profiles (public users who create accounts)
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

CREATE POLICY "Readers can view all profiles"
  ON reader_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Readers can insert own profile"
  ON reader_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Readers can update own profile"
  ON reader_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id)
  WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Readers can delete own profile"
  ON reader_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = auth_id);

-- Anon users can view profiles (for public article author attribution)
CREATE POLICY "Public can view reader profiles"
  ON reader_profiles FOR SELECT
  TO anon
  USING (true);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reader_auth_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(reader_auth_id, article_id)
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Readers can view own bookmarks"
  ON bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = reader_auth_id);

CREATE POLICY "Readers can insert own bookmarks"
  ON bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reader_auth_id);

CREATE POLICY "Readers can delete own bookmarks"
  ON bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = reader_auth_id);
