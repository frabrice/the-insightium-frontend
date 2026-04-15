/*
  # Base Schema: Categories, Articles, Videos, Podcasts, and Curation Tables
  
  Creates the core content tables for The Insightium platform.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  excerpt text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES categories(id),
  category_name text NOT NULL,
  author text NOT NULL,
  author_bio text,
  publish_date timestamptz NOT NULL,
  read_time text,
  tags text,
  featured_image text NOT NULL,
  featured_image_alt text,
  meta_description text,
  status text NOT NULL CHECK (status IN ('draft', 'review', 'published')),
  allow_comments boolean DEFAULT true,
  featured boolean DEFAULT false,
  trending boolean DEFAULT false,
  views text DEFAULT '0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  views text DEFAULT '0',
  upload_date timestamptz NOT NULL,
  thumbnail text NOT NULL,
  youtube_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'published')),
  category text NOT NULL,
  section text NOT NULL CHECK (section IN ('Magazine', 'FullEpisodes', 'MindBattles', 'PitchPerfect', 'InsightStories', 'BehindInsight')),
  rating numeric DEFAULT 4.5,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS podcast_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  guest text NOT NULL,
  duration text NOT NULL,
  plays text DEFAULT '0',
  downloads text DEFAULT '0',
  publish_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'published', 'scheduled')),
  youtube_url text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS main_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  position text NOT NULL CHECK (position IN ('main', 'second')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(position)
);

CREATE TABLE IF NOT EXISTS featured_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(display_order)
);

CREATE TABLE IF NOT EXISTS editors_pick (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(display_order)
);

CREATE TABLE IF NOT EXISTS trending_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(display_order)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE main_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE editors_pick ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read categories" ON categories FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read published articles" ON articles FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Public can read published videos" ON videos FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Public can read published podcast episodes" ON podcast_episodes FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Public can read main articles" ON main_articles FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read featured articles" ON featured_articles FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read editors pick" ON editors_pick FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read trending articles" ON trending_articles FOR SELECT TO anon USING (true);

INSERT INTO categories (name, description) VALUES
  ('Research World', 'Academic research and educational studies'),
  ('Spirit of Africa', 'Cultural and traditional aspects of African education'),
  ('Tech Trends', 'Technology innovations in education'),
  ('Need to Know', 'Essential educational information and updates'),
  ('Echoes of Home', 'Stories about local educational initiatives'),
  ('Career Campus', 'Career development and professional education'),
  ('Mind and Body Quest', 'Mental health and physical wellbeing in education'),
  ('E! Corner', 'Entertainment and creative aspects of education')
ON CONFLICT (name) DO NOTHING;
