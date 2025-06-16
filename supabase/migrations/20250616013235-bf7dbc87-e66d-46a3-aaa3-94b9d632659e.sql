
-- Create the form_submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  menu_type TEXT NOT NULL,
  menu_content TEXT NOT NULL,
  material_preference TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submissions)
CREATE POLICY "Anyone can submit forms" 
  ON public.form_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow authenticated users to view submissions
CREATE POLICY "Authenticated users can view submissions" 
  ON public.form_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update submissions
CREATE POLICY "Authenticated users can update submissions" 
  ON public.form_submissions 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create an index on created_at for efficient sorting
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);

-- Create an index on status for efficient filtering
CREATE INDEX idx_form_submissions_status ON public.form_submissions(status);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
CREATE TRIGGER update_form_submissions_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
