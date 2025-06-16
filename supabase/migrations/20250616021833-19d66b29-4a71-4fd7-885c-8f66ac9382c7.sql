
-- First, let's drop ALL existing policies to ensure a clean slate
DROP POLICY IF EXISTS "Public form submissions allowed" ON public.form_submissions;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;

-- Create a comprehensive policy that allows all INSERT operations
-- This should work for both anonymous users and any authenticated state
CREATE POLICY "Allow all form submissions" 
  ON public.form_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Ensure RLS is enabled (it should be, but let's be explicit)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
