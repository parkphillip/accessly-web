
-- Drop the existing policy that's too restrictive
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_submissions;

-- Create a new policy that allows anyone to insert form submissions
-- This handles both truly anonymous requests and requests with bearer tokens but no actual user
CREATE POLICY "Public form submissions allowed" 
  ON public.form_submissions 
  FOR INSERT 
  WITH CHECK (true);
