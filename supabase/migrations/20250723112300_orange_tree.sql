/*
  # Create Missing Tables for TV Show and Podcast Management

  1. New Tables
    - `tv_show_seasons` - Organize TV episodes by seasons
    - `guest_profiles` - Store guest information for podcasts
    - `podcast_series` - Group podcast episodes by series/topics
  
  2. Enhanced Tables
    - Update `videos` table for TV show episodes
    - Update `podcast_episodes` table with additional fields
  
  3. Security
    - Enable RLS on all tables
    - Add comprehensive policies
  
  4. Functions
    - Helper functions for content management
    - Analytics functions for performance tracking
*/

-- TV Show Seasons Table (for organizing episodes)
CREATE TABLE IF NOT EXISTS tv_show_seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_number int NOT NULL,
  title text NOT NULL,
  description text,
  start_date timestamptz,
  end_date timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(season_number)
);

-- Guest Profiles Table (for podcast guests)
CREATE TABLE IF NOT EXISTS guest_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  title text,
  bio text,
  organization text,
  email text,
  phone text,
  website text,
  social_links jsonb DEFAULT '{}',
  avatar_url text,
  expertise_areas text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Podcast Series Table (for organizing episodes by topics/series)
CREATE TABLE IF NOT EXISTS podcast_series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  cover_image text,
  is_active boolean DEFAULT true,
  episode_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update videos table structure for better TV show management
DO $$
BEGIN
  -- Add season reference if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'season_id'
  ) THEN
    ALTER TABLE videos ADD COLUMN season_id uuid REFERENCES tv_show_seasons(id);
  END IF;

  -- Add episode number if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'episode_number'
  ) THEN
    ALTER TABLE videos ADD COLUMN episode_number int;
  END IF;

  -- Add featured flag if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'featured'
  ) THEN
    ALTER TABLE videos ADD COLUMN featured boolean DEFAULT false;
  END IF;

  -- Add tags if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'tags'
  ) THEN
    ALTER TABLE videos ADD COLUMN tags text;
  END IF;

  -- Add meta description if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'videos' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE videos ADD COLUMN meta_description text;
  END IF;
END $$;

-- Update podcast_episodes table structure
DO $$
BEGIN
  -- Add series reference if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'series_id'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN series_id uuid REFERENCES podcast_series(id);
  END IF;

  -- Add guest reference if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'guest_id'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN guest_id uuid REFERENCES guest_profiles(id);
  END IF;

  -- Add episode number if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'episode_number'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN episode_number int;
  END IF;

  -- Add featured flag if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'featured'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN featured boolean DEFAULT false;
  END IF;

  -- Add tags if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'tags'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN tags text;
  END IF;

  -- Add meta description if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN meta_description text;
  END IF;

  -- Add transcript if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'transcript'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN transcript text;
  END IF;

  -- Add spotify_url if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'spotify_url'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN spotify_url text;
  END IF;

  -- Add apple_url if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'apple_url'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN apple_url text;
  END IF;

  -- Add google_url if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'podcast_episodes' AND column_name = 'google_url'
  ) THEN
    ALTER TABLE podcast_episodes ADD COLUMN google_url text;
  END IF;
END $$;

-- Enable Row Level Security on new tables
ALTER TABLE tv_show_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_series ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for TV Show Seasons
CREATE POLICY "tv_seasons_public_read"
  ON tv_show_seasons
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "tv_seasons_auth_all"
  ON tv_show_seasons
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS Policies for Guest Profiles
CREATE POLICY "guests_public_read"
  ON guest_profiles
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "guests_auth_all"
  ON guest_profiles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create RLS Policies for Podcast Series
CREATE POLICY "podcast_series_public_read"
  ON podcast_series
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "podcast_series_auth_all"
  ON podcast_series
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_videos_season_id ON videos(season_id);
CREATE INDEX IF NOT EXISTS idx_videos_episode_number ON videos(episode_number);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(featured);

CREATE INDEX IF NOT EXISTS idx_podcast_episodes_series_id ON podcast_episodes(series_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_guest_id ON podcast_episodes(guest_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_episode_number ON podcast_episodes(episode_number);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_featured ON podcast_episodes(featured);

CREATE INDEX IF NOT EXISTS idx_guest_profiles_name ON guest_profiles(full_name);
CREATE INDEX IF NOT EXISTS idx_tv_seasons_number ON tv_show_seasons(season_number);
CREATE INDEX IF NOT EXISTS idx_podcast_series_title ON podcast_series(title);

-- Create Functions for Content Management

-- Function to get TV show episodes with season info
CREATE OR REPLACE FUNCTION get_tv_episodes_with_season(season_filter int DEFAULT NULL, limit_count int DEFAULT 50)
RETURNS TABLE(
  id uuid,
  title text,
  description text,
  duration text,
  views text,
  upload_date timestamptz,
  thumbnail text,
  youtube_url text,
  status text,
  category text,
  section text,
  rating numeric,
  is_new boolean,
  featured boolean,
  episode_number int,
  season_number int,
  season_title text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.id,
    v.title,
    v.description,
    v.duration,
    v.views,
    v.upload_date,
    v.thumbnail,
    v.youtube_url,
    v.status,
    v.category,
    v.section,
    v.rating,
    v.is_new,
    v.featured,
    v.episode_number,
    s.season_number,
    s.title as season_title
  FROM videos v
  LEFT JOIN tv_show_seasons s ON v.season_id = s.id
  WHERE v.status = 'published'
    AND (season_filter IS NULL OR s.season_number = season_filter)
  ORDER BY s.season_number DESC, v.episode_number DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get podcast episodes with guest info
CREATE OR REPLACE FUNCTION get_podcast_episodes_with_guests(series_filter uuid DEFAULT NULL, limit_count int DEFAULT 50)
RETURNS TABLE(
  id uuid,
  title text,
  description text,
  duration text,
  plays text,
  downloads text,
  publish_date timestamptz,
  status text,
  youtube_url text,
  spotify_url text,
  apple_url text,
  google_url text,
  image text,
  featured boolean,
  episode_number int,
  guest_name text,
  guest_title text,
  guest_bio text,
  guest_avatar text,
  series_title text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pe.id,
    pe.title,
    pe.description,
    pe.duration,
    pe.plays,
    pe.downloads,
    pe.publish_date,
    pe.status,
    pe.youtube_url,
    pe.spotify_url,
    pe.apple_url,
    pe.google_url,
    pe.image,
    pe.featured,
    pe.episode_number,
    g.full_name as guest_name,
    g.title as guest_title,
    g.bio as guest_bio,
    g.avatar_url as guest_avatar,
    ps.title as series_title
  FROM podcast_episodes pe
  LEFT JOIN guest_profiles g ON pe.guest_id = g.id
  LEFT JOIN podcast_series ps ON pe.series_id = ps.id
  WHERE pe.status = 'published'
    AND (series_filter IS NULL OR pe.series_id = series_filter)
  ORDER BY pe.publish_date DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to update episode counts
CREATE OR REPLACE FUNCTION update_series_episode_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update podcast series episode count
  IF TG_TABLE_NAME = 'podcast_episodes' THEN
    UPDATE podcast_series 
    SET episode_count = (
      SELECT COUNT(*) 
      FROM podcast_episodes 
      WHERE series_id = COALESCE(NEW.series_id, OLD.series_id) 
        AND status = 'published'
    )
    WHERE id = COALESCE(NEW.series_id, OLD.series_id);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic episode count updates
DROP TRIGGER IF EXISTS update_podcast_series_count ON podcast_episodes;
CREATE TRIGGER update_podcast_series_count
  AFTER INSERT OR UPDATE OR DELETE ON podcast_episodes
  FOR EACH ROW
  EXECUTE FUNCTION update_series_episode_count();

-- Function for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_tv_seasons_updated_at ON tv_show_seasons;
CREATE TRIGGER update_tv_seasons_updated_at 
  BEFORE UPDATE ON tv_show_seasons 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_guest_profiles_updated_at ON guest_profiles;
CREATE TRIGGER update_guest_profiles_updated_at 
  BEFORE UPDATE ON guest_profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_podcast_series_updated_at ON podcast_series;
CREATE TRIGGER update_podcast_series_updated_at 
  BEFORE UPDATE ON podcast_series 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Insert TV Show Seasons
INSERT INTO tv_show_seasons (season_number, title, description, start_date, is_active)
VALUES 
  (1, 'Season 1: Foundation', 'The inaugural season of Project Insight featuring groundbreaking educational challenges', '2024-01-01', true),
  (2, 'Season 2: Innovation', 'Advanced challenges focusing on technological innovation in education', '2024-06-01', true)
ON CONFLICT (season_number) DO NOTHING;

-- Insert Guest Profiles
INSERT INTO guest_profiles (full_name, title, bio, organization, expertise_areas, is_active)
VALUES 
  (
    'Dr. Kwame Asante',
    'AI in Education Researcher',
    'Leading researcher in artificial intelligence applications for educational technology with over 15 years of experience in machine learning and pedagogy.',
    'University of Ghana',
    ARRAY['Artificial Intelligence', 'Educational Technology', 'Machine Learning', 'Pedagogy'],
    true
  ),
  (
    'Prof. Amina Hassan',
    'Inclusive Education Specialist',
    'Renowned expert in creating inclusive learning environments and accessibility in education across diverse communities.',
    'Cairo University',
    ARRAY['Inclusive Education', 'Accessibility', 'Educational Policy', 'Community Development'],
    true
  ),
  (
    'Marcus Johnson',
    'Educational Storyteller',
    'Award-winning educator and storyteller who specializes in narrative-based learning techniques and creative pedagogy.',
    'Storytelling Institute',
    ARRAY['Narrative Learning', 'Creative Writing', 'Educational Psychology', 'Content Creation'],
    true
  ),
  (
    'Dr. Sarah Ochieng',
    'Mental Health in Education Expert',
    'Clinical psychologist specializing in student mental health, campus wellness programs, and educational stress management.',
    'Nairobi University',
    ARRAY['Mental Health', 'Student Wellness', 'Educational Psychology', 'Crisis Intervention'],
    true
  )
ON CONFLICT (full_name) DO NOTHING;

-- Insert Podcast Series
INSERT INTO podcast_series (title, description, cover_image, is_active)
VALUES 
  (
    'Library Talk: Education Leaders',
    'In-depth conversations with education leaders, researchers, and innovators shaping the future of learning.',
    'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    true
  ),
  (
    'Library Talk: Student Voices',
    'Authentic conversations with students sharing their educational journeys, challenges, and successes.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    true
  )
ON CONFLICT (title) DO NOTHING;