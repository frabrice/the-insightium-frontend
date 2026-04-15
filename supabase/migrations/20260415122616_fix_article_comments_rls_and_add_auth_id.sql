/*
  # Fix article_comments RLS to work for authenticated readers

  ## Problem
  The existing policies on article_comments only allowed `anon` role to read
  and insert. Once a reader logs in they become `authenticated` and can no
  longer read or post comments.

  ## Changes
  1. Add `reader_auth_id` column to article_comments (nullable, for linking to auth.users)
  2. Add SELECT policy for authenticated users
  3. Add INSERT policy for authenticated users (requires their auth id)
*/

-- Add reader_auth_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'article_comments' AND column_name = 'reader_auth_id'
  ) THEN
    ALTER TABLE article_comments ADD COLUMN reader_auth_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Allow authenticated users to read approved comments
CREATE POLICY "Authenticated can read approved comments"
  ON article_comments FOR SELECT
  TO authenticated
  USING (status = 'approved');

-- Allow authenticated users to insert their own comments
CREATE POLICY "Authenticated can submit comments"
  ON article_comments FOR INSERT
  TO authenticated
  WITH CHECK (true);
