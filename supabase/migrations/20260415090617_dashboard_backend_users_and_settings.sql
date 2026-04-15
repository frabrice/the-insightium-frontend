/*
  # Dashboard Backend: Users, Comments, Newsletter, Settings, Analytics
  
  Creates admin users table and supporting tables for the dashboard backend.
*/

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

CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_date date NOT NULL,
  additional_data jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS video_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  viewer_ip text,
  watch_duration int DEFAULT 0,
  completion_rate numeric DEFAULT 0,
  viewer_country text,
  referrer text,
  watched_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS podcast_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id uuid REFERENCES podcast_episodes(id) ON DELETE CASCADE,
  listener_ip text,
  listen_duration int DEFAULT 0,
  completion_rate numeric DEFAULT 0,
  listener_country text,
  platform text,
  listened_at timestamptz DEFAULT now()
);

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

CREATE POLICY "Admins can manage users" ON users FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'));

CREATE POLICY "Public can read active authors" ON users FOR SELECT TO anon
  USING (is_active = true AND role IN ('author', 'editor'));

CREATE POLICY "Public can read article images" ON article_images FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM articles a WHERE a.id = article_id AND a.status = 'published'));

CREATE POLICY "Authenticated users can manage article images" ON article_images FOR ALL TO authenticated USING (true);

CREATE POLICY "Anyone can record article views" ON article_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can read article views" ON article_views FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')));

CREATE POLICY "Public can read approved comments" ON article_comments FOR SELECT TO anon USING (status = 'approved');
CREATE POLICY "Anyone can submit comments" ON article_comments FOR INSERT TO anon WITH CHECK (status = 'pending');
CREATE POLICY "Admins can manage comments" ON article_comments FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')));

CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can manage subscribers" ON newsletter_subscribers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'));

CREATE POLICY "Public can read public settings" ON site_settings FOR SELECT TO anon USING (is_public = true);
CREATE POLICY "Admins can manage all settings" ON site_settings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'));

CREATE POLICY "Admins can manage analytics" ON analytics_data FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')));

CREATE POLICY "Anyone can record video views" ON video_analytics FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can read video analytics" ON video_analytics FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')));

CREATE POLICY "Anyone can record podcast listens" ON podcast_analytics FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can read podcast analytics" ON podcast_analytics FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor')));

CREATE POLICY "Authenticated users can manage content schedule" ON content_schedule FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin', 'editor', 'author')));

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

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_podcast_episodes_updated_at BEFORE UPDATE ON podcast_episodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_article_images_updated_at BEFORE UPDATE ON article_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_article_comments_updated_at BEFORE UPDATE ON article_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_schedule_updated_at BEFORE UPDATE ON content_schedule FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
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
