/*
  # Dashboard Backend Enhancements

  1. New Tables
    - `users` - Admin users and authors
    - `article_images` - Images associated with articles
    - `article_views` - Track article view statistics
    - `article_comments` - Comments on articles (if enabled)
    - `newsletter_subscribers` - Email newsletter subscribers
    - `site_settings` - Global site configuration
    - `analytics_data` - Site analytics and metrics
  
  2. Enhanced Tables
    - Add indexes for better performance
    - Add triggers for automatic timestamps
    - Add functions for common operations
  
  3. Security
    - Enable RLS on all new tables
    - Add comprehensive policies
    - Add admin-only access controls
*/

-- Users Table (Admin users and authors)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor', 'author')) DEFAULT 'author',
  bio text,
  avatar_url text,
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Article Images Table (For image gallery functionality)
CREATE TABLE IF NOT EXISTS article_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  caption text,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Article Views Table (Track view statistics)
CREATE TABLE IF NOT EXISTS article_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  viewer_ip text,
  viewer_country text,
  viewer_city text,
  user_agent text,
  referrer text,
  viewed_at timestamptz DEFAULT now()
);

-- Article Comments Table
CREATE TABLE IF NOT EXISTS article_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  parent_comment_id uuid REFERENCES article_comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  status text NOT NULL CHECK (status IN ('active', 'unsubscribed', 'bounced')) DEFAULT 'active',
  subscription_source text DEFAULT 'website',
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  setting_type text NOT NULL CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array')),
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Analytics Data Table
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_date date NOT NULL,
  additional_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Video Analytics Table
CREATE TABLE IF NOT EXISTS video_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  viewer_ip text,
  watch_duration int DEFAULT 0, -- in seconds
  completion_rate numeric DEFAULT 0, -- percentage
  viewer_country text,
  referrer text,
  watched_at timestamptz DEFAULT now()
);

-- Podcast Analytics Table
CREATE TABLE IF NOT EXISTS podcast_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id uuid REFERENCES podcast_episodes(id) ON DELETE CASCADE,
  listener_ip text,
  listen_duration int DEFAULT 0, -- in seconds
  completion_rate numeric DEFAULT 0, -- percentage
  listener_country text,
  platform text, -- spotify, apple, youtube, etc.
  listened_at timestamptz DEFAULT now()
);

-- Content Scheduling Table
CREATE TABLE IF NOT EXISTS content_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL CHECK (content_type IN ('article', 'video', 'podcast')),
  content_id uuid NOT NULL,
  scheduled_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled', 'published', 'cancelled')) DEFAULT 'scheduled',
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_schedule ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users Policies (Admin only for management, public read for authors)
CREATE POLICY "Admins can manage users"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "Public can read active authors"
  ON users
  FOR SELECT
  TO anon
  USING (is_active = true AND role IN ('author', 'editor'));

-- Article Images Policies
CREATE POLICY "Public can read article images"
  ON article_images
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM articles a 
      WHERE a.id = article_id AND a.status = 'published'
    )
  );

CREATE POLICY "Authenticated users can manage article images"
  ON article_images
  FOR ALL
  TO authenticated
  USING (true);

-- Article Views Policies (Public insert for tracking, admin read)
CREATE POLICY "Anyone can record article views"
  ON article_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read article views"
  ON article_views
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')
    )
  );

-- Article Comments Policies
CREATE POLICY "Public can read approved comments"
  ON article_comments
  FOR SELECT
  TO anon
  USING (status = 'approved');

CREATE POLICY "Anyone can submit comments"
  ON article_comments
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending');

CREATE POLICY "Admins can manage comments"
  ON article_comments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')
    )
  );

-- Newsletter Subscribers Policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can manage subscribers"
  ON newsletter_subscribers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- Site Settings Policies
CREATE POLICY "Public can read public settings"
  ON site_settings
  FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Admins can manage all settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- Analytics Policies (Admin only)
CREATE POLICY "Admins can manage analytics"
  ON analytics_data
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')
    )
  );

-- Video Analytics Policies
CREATE POLICY "Anyone can record video views"
  ON video_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read video analytics"
  ON video_analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')
    )
  );

-- Podcast Analytics Policies
CREATE POLICY "Anyone can record podcast listens"
  ON podcast_analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read podcast analytics"
  ON podcast_analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')
    )
  );

-- Content Schedule Policies
CREATE POLICY "Authenticated users can manage content schedule"
  ON content_schedule
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor', 'author')
    )
  );

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_name);
CREATE INDEX IF NOT EXISTS idx_articles_publish_date ON articles(publish_date);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_trending ON articles(trending);

CREATE INDEX IF NOT EXISTS idx_article_images_article_id ON article_images(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_viewed_at ON article_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_article_comments_article_id ON article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_status ON article_comments(status);

CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_section ON videos(section);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_status ON podcast_episodes(status);

CREATE INDEX IF NOT EXISTS idx_analytics_metric_name ON analytics_data(metric_name);
CREATE INDEX IF NOT EXISTS idx_analytics_metric_date ON analytics_data(metric_date);

-- Create Functions for Common Operations

-- Function to update article view count
CREATE OR REPLACE FUNCTION increment_article_views(article_uuid uuid)
RETURNS void AS $$
BEGIN
  UPDATE articles 
  SET views = COALESCE(CAST(NULLIF(views, '') AS INTEGER), 0) + 1
  WHERE id = article_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to get trending articles based on recent views
CREATE OR REPLACE FUNCTION get_trending_articles(days_back integer DEFAULT 7, limit_count integer DEFAULT 10)
RETURNS TABLE(
  article_id uuid,
  title text,
  view_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    av.article_id,
    a.title,
    COUNT(*) as view_count
  FROM article_views av
  JOIN articles a ON av.article_id = a.id
  WHERE av.viewed_at >= NOW() - INTERVAL '1 day' * days_back
    AND a.status = 'published'
  GROUP BY av.article_id, a.title
  ORDER BY view_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get popular content by type
CREATE OR REPLACE FUNCTION get_popular_content(content_type text, days_back integer DEFAULT 30, limit_count integer DEFAULT 5)
RETURNS TABLE(
  content_id uuid,
  title text,
  views_or_plays bigint
) AS $$
BEGIN
  IF content_type = 'articles' THEN
    RETURN QUERY
    SELECT 
      av.article_id as content_id,
      a.title,
      COUNT(*) as views_or_plays
    FROM article_views av
    JOIN articles a ON av.article_id = a.id
    WHERE av.viewed_at >= NOW() - INTERVAL '1 day' * days_back
      AND a.status = 'published'
    GROUP BY av.article_id, a.title
    ORDER BY views_or_plays DESC
    LIMIT limit_count;
  ELSIF content_type = 'videos' THEN
    RETURN QUERY
    SELECT 
      va.video_id as content_id,
      v.title,
      COUNT(*) as views_or_plays
    FROM video_analytics va
    JOIN videos v ON va.video_id = v.id
    WHERE va.watched_at >= NOW() - INTERVAL '1 day' * days_back
      AND v.status = 'published'
    GROUP BY va.video_id, v.title
    ORDER BY views_or_plays DESC
    LIMIT limit_count;
  ELSIF content_type = 'podcasts' THEN
    RETURN QUERY
    SELECT 
      pa.episode_id as content_id,
      pe.title,
      COUNT(*) as views_or_plays
    FROM podcast_analytics pa
    JOIN podcast_episodes pe ON pa.episode_id = pe.id
    WHERE pa.listened_at >= NOW() - INTERVAL '1 day' * days_back
      AND pe.status = 'published'
    GROUP BY pa.episode_id, pe.title
    ORDER BY views_or_plays DESC
    LIMIT limit_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to all tables with updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_podcast_episodes_updated_at BEFORE UPDATE ON podcast_episodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_article_images_updated_at BEFORE UPDATE ON article_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_article_comments_updated_at BEFORE UPDATE ON article_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_schedule_updated_at BEFORE UPDATE ON content_schedule FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (you should change this password!)
INSERT INTO users (email, full_name, role, bio, is_active)
VALUES (
  'admin@theinsightium.com',
  'Admin User',
  'admin',
  'System Administrator',
  true
) ON CONFLICT (email) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public)
VALUES 
  ('site_name', '"The Insightium"', 'string', 'Website name', true),
  ('site_description', '"Empowering education through innovative content"', 'string', 'Website description', true),
  ('contact_email', '"admin@theinsightium.com"', 'string', 'Contact email', true),
  ('contact_phone', '"+250 780 849 228"', 'string', 'Contact phone', true),
  ('social_facebook', '"#"', 'string', 'Facebook URL', true),
  ('social_twitter', '"#"', 'string', 'Twitter URL', true),
  ('social_instagram', '"#"', 'string', 'Instagram URL', true),
  ('social_linkedin', '"#"', 'string', 'LinkedIn URL', true),
  ('social_youtube', '"#"', 'string', 'YouTube URL', true),
  ('articles_per_page', '10', 'number', 'Articles per page', false),
  ('enable_comments', 'true', 'boolean', 'Enable article comments', false),
  ('enable_newsletter', 'true', 'boolean', 'Enable newsletter signup', false),
  ('maintenance_mode', 'false', 'boolean', 'Maintenance mode', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Insert sample analytics data
INSERT INTO analytics_data (metric_name, metric_value, metric_date)
VALUES 
  ('daily_visitors', 1247, CURRENT_DATE),
  ('daily_page_views', 3891, CURRENT_DATE),
  ('daily_article_views', 2156, CURRENT_DATE),
  ('daily_video_views', 892, CURRENT_DATE),
  ('daily_podcast_plays', 445, CURRENT_DATE),
  ('newsletter_subscribers', 15420, CURRENT_DATE)
ON CONFLICT DO NOTHING;