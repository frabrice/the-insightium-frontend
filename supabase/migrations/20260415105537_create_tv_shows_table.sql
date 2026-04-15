
/*
  # Create TV Shows Table

  1. New Tables
    - `tv_shows` - Stores TV show entries for The Insightium TV
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `thumbnail` (text)
      - `genre` (text)
      - `status` (text: 'published' | 'draft' | 'coming_soon')
      - `total_seasons` (int)
      - `total_episodes` (int)
      - `rating` (numeric)
      - `is_new` (boolean)
      - `created_at`, `updated_at` (timestamps)

  2. Security
    - Enable RLS
    - Public can read published shows
    - Authenticated users with admin/super_admin role can manage shows

  3. Seed Data
    - 3 "coming soon" placeholder entries
*/

CREATE TABLE IF NOT EXISTS tv_shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail text,
  genre text,
  status text NOT NULL DEFAULT 'draft',
  total_seasons int DEFAULT 1,
  total_episodes int DEFAULT 0,
  rating numeric DEFAULT 4.5,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tv_shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published tv shows"
  ON tv_shows FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can insert tv shows"
  ON tv_shows FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can update tv shows"
  ON tv_shows FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can delete tv shows"
  ON tv_shows FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );

INSERT INTO tv_shows (title, description, thumbnail, genre, status, total_seasons, total_episodes, rating, is_new)
VALUES
  (
    'Voices of the Continent',
    'A documentary series celebrating the untold stories of Africa''s most remarkable changemakers — scientists, artists, activists, and entrepreneurs who are reshaping their communities and inspiring the world.',
    'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg',
    'Documentary',
    'published',
    1,
    6,
    4.9,
    true
  ),
  (
    'The Future Makers',
    'Meet the young innovators, coders, and entrepreneurs building tomorrow''s Africa today. Each episode dives deep into one startup''s journey from idea to impact.',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    'Technology',
    'published',
    1,
    8,
    4.7,
    true
  ),
  (
    'African Frontiers',
    'A geopolitical and cultural exploration series journeying across African nations to understand the forces shaping politics, identity, and opportunity in the 21st century.',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    'Current Affairs',
    'published',
    1,
    10,
    4.8,
    false
  );
