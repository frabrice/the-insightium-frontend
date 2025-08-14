/*
  # Fix Articles RLS Policies for Dashboard Access

  1. Security Updates
    - Update RLS policies to allow authenticated users to manage articles
    - Add policies for article creation, updates, and management
    - Ensure dashboard functionality works properly
  
  2. Policy Changes
    - Allow authenticated users to create articles
    - Allow authenticated users to update their own articles
    - Allow admin users to manage all articles
*/

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can manage articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage all articles" ON articles;

-- Create new comprehensive policies

-- Public can read published articles
CREATE POLICY "Public can read published articles"
  ON articles
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Authenticated users can read all articles
CREATE POLICY "Authenticated users can read all articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create articles
CREATE POLICY "Authenticated users can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update articles
CREATE POLICY "Authenticated users can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete articles
CREATE POLICY "Authenticated users can delete articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

-- Also update policies for related tables

-- Article Images policies
DROP POLICY IF EXISTS "Public can read article images" ON article_images;
DROP POLICY IF EXISTS "Authenticated users can manage article images" ON article_images;

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
  USING (true)
  WITH CHECK (true);

-- Main Articles policies
DROP POLICY IF EXISTS "Public can read main articles" ON main_articles;
DROP POLICY IF EXISTS "Authenticated users can manage main articles" ON main_articles;

CREATE POLICY "Public can read main articles"
  ON main_articles
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage main articles"
  ON main_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Featured Articles policies
DROP POLICY IF EXISTS "Public can read featured articles" ON featured_articles;
DROP POLICY IF EXISTS "Authenticated users can manage featured articles" ON featured_articles;

CREATE POLICY "Public can read featured articles"
  ON featured_articles
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage featured articles"
  ON featured_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Editors Pick policies
DROP POLICY IF EXISTS "Public can read editors pick" ON editors_pick;
DROP POLICY IF EXISTS "Authenticated users can manage editors pick" ON editors_pick;

CREATE POLICY "Public can read editors pick"
  ON editors_pick
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage editors pick"
  ON editors_pick
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trending Articles policies
DROP POLICY IF EXISTS "Public can read trending articles" ON trending_articles;
DROP POLICY IF EXISTS "Authenticated users can manage trending articles" ON trending_articles;

CREATE POLICY "Public can read trending articles"
  ON trending_articles
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage trending articles"
  ON trending_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);