
-- First, let's drop ALL existing policies to ensure a clean slate
DROP POLICY IF EXISTS "Anyone can submit forms" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public.form_submissions;

-- Create a new policy that explicitly allows anonymous INSERT operations
CREATE POLICY "Allow anonymous form submissions" 
  ON public.form_submissions 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Recreate the other policies for authenticated users
CREATE POLICY "Authenticated users can view submissions" 
  ON public.form_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update submissions" 
  ON public.form_submissions 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');
