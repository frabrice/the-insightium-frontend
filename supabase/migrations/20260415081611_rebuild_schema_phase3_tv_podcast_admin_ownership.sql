/*
  # Phase 3: TV Shows, Podcasts, and Admin Ownership

  ## Summary
  Adds admin_id ownership to podcast episodes and videos. Creates TV shows
  parent table and TV show seasons table for proper episode management.

  ## Changes

  ### Modified Tables
  - `podcast_episodes`: Add admin_id, episode_number, cover_image, audio_url
  - `videos`: Add admin_id

  ### New Tables
  - `tv_shows`: Parent TV show records
  - `tv_show_seasons`: Season records for TV shows
  - `tv_show_episodes`: Individual episodes within seasons

  ## Security
  - RLS enabled on all new tables
  - Public reads published content only
  - Authenticated users can manage content
*/

-- Add admin_id to podcast_episodes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'podcast_episodes' AND column_name = 'admin_id'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN admin_id uuid REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add admin_id to videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'videos' AND column_name = 'admin_id'
  ) THEN
    ALTER TABLE videos ADD COLUMN admin_id uuid REFERENCES users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add episode_number to podcast_episodes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'podcast_episodes' AND column_name = 'episode_number'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN episode_number integer DEFAULT 1;
  END IF;
END $$;

-- Add cover_image to podcast_episodes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'podcast_episodes' AND column_name = 'cover_image'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN cover_image text;
  END IF;
END $$;

-- Add audio_url to podcast_episodes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'podcast_episodes' AND column_name = 'audio_url'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN audio_url text;
  END IF;
END $$;

-- TV Shows parent table
CREATE TABLE IF NOT EXISTS tv_shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  thumbnail text NOT NULL DEFAULT '',
  admin_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status text DEFAULT 'draft' CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  total_seasons integer DEFAULT 1,
  total_episodes integer DEFAULT 0,
  rating numeric DEFAULT 4.5,
  genre text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tv_shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published tv shows"
  ON tv_shows FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Authenticated can view all tv shows"
  ON tv_shows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert tv shows"
  ON tv_shows FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update tv shows"
  ON tv_shows FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete tv shows"
  ON tv_shows FOR DELETE
  TO authenticated
  USING (true);

-- TV Show Seasons
CREATE TABLE IF NOT EXISTS tv_show_seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tv_show_id uuid NOT NULL REFERENCES tv_shows(id) ON DELETE CASCADE,
  season_number integer NOT NULL DEFAULT 1,
  title text NOT NULL DEFAULT '',
  description text,
  episode_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tv_show_seasons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view tv show seasons"
  ON tv_show_seasons FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view tv show seasons"
  ON tv_show_seasons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert tv show seasons"
  ON tv_show_seasons FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update tv show seasons"
  ON tv_show_seasons FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete tv show seasons"
  ON tv_show_seasons FOR DELETE
  TO authenticated
  USING (true);

-- TV Show Episodes
CREATE TABLE IF NOT EXISTS tv_show_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid NOT NULL REFERENCES tv_show_seasons(id) ON DELETE CASCADE,
  tv_show_id uuid NOT NULL REFERENCES tv_shows(id) ON DELETE CASCADE,
  episode_number integer NOT NULL DEFAULT 1,
  title text NOT NULL,
  description text,
  youtube_url text,
  thumbnail text,
  duration text,
  views text DEFAULT '0',
  status text DEFAULT 'draft' CHECK (status = ANY (ARRAY['draft'::text, 'published'::text])),
  publish_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tv_show_episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published tv show episodes"
  ON tv_show_episodes FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Authenticated can view all tv show episodes"
  ON tv_show_episodes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert tv show episodes"
  ON tv_show_episodes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update tv show episodes"
  ON tv_show_episodes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete tv show episodes"
  ON tv_show_episodes FOR DELETE
  TO authenticated
  USING (true);

-- Article views RLS
CREATE POLICY "Anyone can insert article views"
  ON article_views FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert article views"
  ON article_views FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view article views"
  ON article_views FOR SELECT
  TO authenticated
  USING (true);

-- Analytics data RLS
CREATE POLICY "Authenticated can view analytics"
  ON analytics_data FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert analytics"
  ON analytics_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Article images RLS
CREATE POLICY "Public can view article images"
  ON article_images FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view article images"
  ON article_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert article images"
  ON article_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update article images"
  ON article_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete article images"
  ON article_images FOR DELETE
  TO authenticated
  USING (true);
