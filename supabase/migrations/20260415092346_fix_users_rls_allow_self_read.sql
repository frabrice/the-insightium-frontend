/*
  # Fix users RLS - allow authenticated users to read their own row

  Adds a policy so that any authenticated user can always read their own
  row by matching auth_id = auth.uid(). This ensures the post-login
  profile fetch never fails due to missing anon coverage for super_admin role.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'users' AND policyname = 'Users can read own profile by auth_id'
  ) THEN
    CREATE POLICY "Users can read own profile by auth_id"
      ON public.users
      FOR SELECT
      TO authenticated
      USING (auth_id = auth.uid());
  END IF;
END $$;
