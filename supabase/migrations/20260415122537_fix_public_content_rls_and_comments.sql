/*
  # Fix public content access for authenticated users + add comments table

  ## Problem
  The RLS policies for articles, videos, and podcast_episodes only granted
  SELECT access to the `anon` role. When a reader logs in they become
  `authenticated` and lose visibility of all published content.

  ## Changes
  1. Articles – add SELECT policy for authenticated role (published content)
  2. Videos – add SELECT policy for authenticated role (published content)
  3. Podcast episodes – add SELECT policy for authenticated role (published content)
  4. Categories – add SELECT policy for authenticated role
  5. Comments – create table with RLS; anon can read, authenticated can insert own
*/

-- 1. Articles: authenticated readers can read published articles
CREATE POLICY "Authenticated can read published articles"
  ON articles FOR SELECT
  TO authenticated
  USING (status = 'published');

-- 2. Videos: authenticated readers can read published videos
CREATE POLICY "Authenticated can read published videos"
  ON videos FOR SELECT
  TO authenticated
  USING (status = 'published');

-- 3. Podcast episodes: authenticated readers can read published episodes
CREATE POLICY "Authenticated can read published podcast episodes"
  ON podcast_episodes FOR SELECT
  TO authenticated
  USING (status = 'published');

-- 4. Categories: authenticated readers can read categories
CREATE POLICY "Authenticated can read categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- 5. Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name text NOT NULL DEFAULT '',
  author_email text NOT NULL DEFAULT '',
  content text NOT NULL,
  status text NOT NULL DEFAULT 'approved',
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved comments"
  ON comments FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Authenticated users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE INDEX IF NOT EXISTS comments_article_id_idx ON comments(article_id);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON comments(parent_id);
