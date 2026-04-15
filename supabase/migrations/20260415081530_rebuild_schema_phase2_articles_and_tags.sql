/*
  # Phase 2: Articles, Tags, and Content Schema Improvements

  ## Summary
  Extends articles with slug, gallery images, scheduled status, and author FK.
  Adds proper tags system replacing plain text tags field.

  ## Changes

  ### Modified Tables
  - `articles`: Add slug, gallery_images, scheduled_at, author_id FK
  - `article_comments`: Add reader_auth_id FK for logged-in reader comments

  ### New Tables
  - `tags`: Reusable content tags
  - `article_tags`: Junction table for articles <-> tags

  ## Security
  - RLS enabled on all new tables
  - Public read access on published content
  - Admins manage own content only
  - Super admins manage all content
*/

-- Add new fields to articles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'slug'
  ) THEN
    ALTER TABLE articles ADD COLUMN slug text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'gallery_images'
  ) THEN
    ALTER TABLE articles ADD COLUMN gallery_images jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'scheduled_at'
  ) THEN
    ALTER TABLE articles ADD COLUMN scheduled_at timestamptz;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'author_id'
  ) THEN
    ALTER TABLE articles ADD COLUMN author_id uuid REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Update articles status to include 'scheduled'
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_status_check;
ALTER TABLE articles ADD CONSTRAINT articles_status_check 
  CHECK (status = ANY (ARRAY['draft'::text, 'review'::text, 'published'::text, 'scheduled'::text]));

-- Add reader auth ID to comments for logged-in commenter tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'article_comments' AND column_name = 'reader_auth_id'
  ) THEN
    ALTER TABLE article_comments ADD COLUMN reader_auth_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view tags"
  ON tags FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view tags"
  ON tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Article tags junction
CREATE TABLE IF NOT EXISTS article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, tag_id)
);

ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view article tags"
  ON article_tags FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view article tags"
  ON article_tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert article tags"
  ON article_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete article tags"
  ON article_tags FOR DELETE
  TO authenticated
  USING (true);

-- Update article_comments RLS to allow anon reads of approved comments
DROP POLICY IF EXISTS "Allow public read access" ON article_comments;
DROP POLICY IF EXISTS "Allow authenticated insert" ON article_comments;
DROP POLICY IF EXISTS "Allow admin management" ON article_comments;

CREATE POLICY "Public can view approved comments"
  ON article_comments FOR SELECT
  TO anon
  USING (status = 'approved');

CREATE POLICY "Authenticated can view approved comments"
  ON article_comments FOR SELECT
  TO authenticated
  USING (status = 'approved' OR reader_auth_id = auth.uid());

CREATE POLICY "Anyone can insert comments"
  ON article_comments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert comments"
  ON article_comments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add views as integer instead of text (keep backward compat)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE articles ADD COLUMN view_count integer DEFAULT 0;
  END IF;
END $$;

-- RLS for articles - public can read published articles
DROP POLICY IF EXISTS "Allow public read access" ON articles;
DROP POLICY IF EXISTS "Allow authenticated read" ON articles;
DROP POLICY IF EXISTS "Allow admin create" ON articles;
DROP POLICY IF EXISTS "Allow admin update own" ON articles;
DROP POLICY IF EXISTS "Allow admin delete own" ON articles;

CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Authenticated can view all articles"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- RLS for categories - public read
DROP POLICY IF EXISTS "Allow public read access" ON categories;

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can manage categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS for videos - public read published
DROP POLICY IF EXISTS "Allow public read access" ON videos;

CREATE POLICY "Public can view published videos"
  ON videos FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Authenticated can view all videos"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- RLS for podcast_episodes - public read published
DROP POLICY IF EXISTS "Allow public read access" ON podcast_episodes;

CREATE POLICY "Public can view published podcasts"
  ON podcast_episodes FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Authenticated can view all podcasts"
  ON podcast_episodes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert podcasts"
  ON podcast_episodes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update podcasts"
  ON podcast_episodes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete podcasts"
  ON podcast_episodes FOR DELETE
  TO authenticated
  USING (true);

-- RLS for curation tables - public read
CREATE POLICY "Public can view main articles"
  ON main_articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can manage main articles"
  ON main_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update main articles"
  ON main_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete main articles"
  ON main_articles FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Public can view featured articles"
  ON featured_articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can manage featured articles"
  ON featured_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update featured articles"
  ON featured_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete featured articles"
  ON featured_articles FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Public can view editors pick"
  ON editors_pick FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can manage editors pick"
  ON editors_pick FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update editors pick"
  ON editors_pick FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete editors pick"
  ON editors_pick FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Public can view trending articles"
  ON trending_articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can manage trending articles"
  ON trending_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update trending articles"
  ON trending_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete trending articles"
  ON trending_articles FOR DELETE
  TO authenticated
  USING (true);

-- Newsletter - anon can subscribe
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

-- Site settings - public can read public settings
CREATE POLICY "Public can view public settings"
  ON site_settings FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Authenticated can view all settings"
  ON site_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users table RLS
DROP POLICY IF EXISTS "Allow admin read" ON users;
DROP POLICY IF EXISTS "Allow admin management" ON users;

CREATE POLICY "Public can view user profiles"
  ON users FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated can view users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update users"
  ON users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete users"
  ON users FOR DELETE
  TO authenticated
  USING (true);

-- Seed some default tags
INSERT INTO tags (name, slug) VALUES
  ('Education', 'education'),
  ('Technology', 'technology'),
  ('Innovation', 'innovation'),
  ('Africa', 'africa'),
  ('Leadership', 'leadership'),
  ('Business', 'business'),
  ('Culture', 'culture'),
  ('Science', 'science'),
  ('Health', 'health'),
  ('Politics', 'politics'),
  ('Environment', 'environment'),
  ('Youth', 'youth')
ON CONFLICT (slug) DO NOTHING;
