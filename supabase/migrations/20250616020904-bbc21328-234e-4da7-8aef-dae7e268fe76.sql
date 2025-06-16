
-- Update the RLS policy to allow anonymous users to submit forms
-- This replaces the existing policy that was too restrictive
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;

CREATE POLICY "Anyone can submit forms" 
  ON public.form_submissions 
  FOR INSERT 
  WITH CHECK (true);
