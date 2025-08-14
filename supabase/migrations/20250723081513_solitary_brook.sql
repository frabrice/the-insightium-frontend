/*
  # Fix Articles RLS Policies for Dashboard Access

  1. Security Updates
    - Update RLS policies to allow article creation from dashboard
    - Temporarily disable RLS for articles table to allow dashboard operations
    - Add proper policies for authenticated users
  
  2. Policy Changes
    - Allow all operations for authenticated users on articles
    - Maintain public read access for published articles
    - Enable dashboard functionality
*/

-- Temporarily disable RLS on articles table to allow dashboard operations
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on articles
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can create articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;

-- Create new permissive policies

-- Allow public to read published articles
CREATE POLICY "Public can read published articles"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Allow all operations for authenticated users (dashboard access)
CREATE POLICY "Allow all operations for authenticated users"
  ON articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Also update related tables to ensure they work with the dashboard

-- Main Articles policies
DROP POLICY IF EXISTS "Public can read main articles" ON main_articles;
DROP POLICY IF EXISTS "Authenticated users can manage main articles" ON main_articles;

CREATE POLICY "Public can read main articles"
  ON main_articles
  FOR SELECT
  TO anon, authenticated
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
  TO anon, authenticated
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
  TO anon, authenticated
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
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage trending articles"
  ON trending_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Article Images policies
DROP POLICY IF EXISTS "Public can read article images" ON article_images;
DROP POLICY IF EXISTS "Authenticated users can manage article images" ON article_images;

CREATE POLICY "Public can read article images"
  ON article_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage article images"
  ON article_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);