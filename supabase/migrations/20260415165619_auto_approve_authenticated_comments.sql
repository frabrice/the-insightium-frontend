/*
  # Auto-approve comments from authenticated (logged-in) readers

  ## Problem
  The article_comments table defaults status to 'pending'. The SELECT policy
  only shows 'approved' comments. So when a logged-in user posts a comment
  it sits in pending and never appears.

  ## Changes
  1. Drop the INSERT policy that uses WITH CHECK (true) - it allows pending status
  2. Add a new INSERT policy that forces status = 'approved' for authenticated users
  3. Also set the default status to 'approved' for new rows inserted by authenticated users
     via a stricter WITH CHECK clause
*/

-- Drop the loose INSERT policy for authenticated users
DROP POLICY IF EXISTS "Authenticated can submit comments" ON article_comments;

-- New INSERT policy: authenticated users can only insert with status = 'approved'
CREATE POLICY "Authenticated can submit approved comments"
  ON article_comments FOR INSERT
  TO authenticated
  WITH CHECK (status = 'approved');
