/*
  # Enable Article Creation for Dashboard

  1. Security Updates
    - Temporarily disable RLS on articles table
    - Create permissive policies for authenticated operations
    - Allow article creation from dashboard
  
  2. Policy Changes
    - Allow public read access for published articles
    - Allow all operations for any authenticated user
    - Remove restrictive policies that block dashboard operations
*/

-- Temporarily disable RLS to clear existing policies
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on articles table
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can create articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON articles;

-- Create new permissive policies

-- Allow public to read published articles
CREATE POLICY "articles_select_published"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Allow authenticated users to do everything with articles
CREATE POLICY "articles_all_authenticated"
  ON articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Also update related tables to ensure they work

-- Main Articles
ALTER TABLE main_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE main_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read main articles" ON main_articles;
DROP POLICY IF EXISTS "Authenticated users can manage main articles" ON main_articles;

CREATE POLICY "main_articles_select_all"
  ON main_articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "main_articles_all_authenticated"
  ON main_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Featured Articles
ALTER TABLE featured_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE featured_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read featured articles" ON featured_articles;
DROP POLICY IF EXISTS "Authenticated users can manage featured articles" ON featured_articles;

CREATE POLICY "featured_articles_select_all"
  ON featured_articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "featured_articles_all_authenticated"
  ON featured_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Editors Pick
ALTER TABLE editors_pick DISABLE ROW LEVEL SECURITY;
ALTER TABLE editors_pick ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read editors pick" ON editors_pick;
DROP POLICY IF EXISTS "Authenticated users can manage editors pick" ON editors_pick;

CREATE POLICY "editors_pick_select_all"
  ON editors_pick
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "editors_pick_all_authenticated"
  ON editors_pick
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trending Articles
ALTER TABLE trending_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE trending_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read trending articles" ON trending_articles;
DROP POLICY IF EXISTS "Authenticated users can manage trending articles" ON trending_articles;

CREATE POLICY "trending_articles_select_all"
  ON trending_articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "trending_articles_all_authenticated"
  ON trending_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Categories
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read categories" ON categories;

CREATE POLICY "categories_select_all"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "categories_all_authenticated"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);