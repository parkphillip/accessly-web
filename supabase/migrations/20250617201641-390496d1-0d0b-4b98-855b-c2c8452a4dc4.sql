
-- First, let's add the new columns we need
ALTER TABLE public.form_submissions 
ADD COLUMN submission_number SERIAL,
ADD COLUMN full_address TEXT,
ADD COLUMN image_file_names TEXT[];

-- Create a function to generate the submission number with padding
CREATE OR REPLACE FUNCTION get_formatted_submission_number()
RETURNS TEXT AS $$
DECLARE
    next_val INTEGER;
BEGIN
    SELECT COALESCE(MAX(submission_number), 0) + 1 INTO next_val FROM public.form_submissions;
    RETURN '#' || LPAD(next_val::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Update existing records to have the new combined address format
UPDATE public.form_submissions 
SET full_address = CONCAT(address, ', ', city, ', ', state, ' ', COALESCE(zip_code, ''))
WHERE full_address IS NULL;

-- Update existing records to have submission numbers
DO $$
DECLARE
    rec RECORD;
    counter INTEGER := 1;
BEGIN
    FOR rec IN SELECT id FROM public.form_submissions ORDER BY created_at
    LOOP
        UPDATE public.form_submissions 
        SET submission_number = counter 
        WHERE id = rec.id;
        counter := counter + 1;
    END LOOP;
END $$;

-- Make the new columns required after populating them
ALTER TABLE public.form_submissions 
ALTER COLUMN full_address SET NOT NULL,
ALTER COLUMN submission_number SET NOT NULL;

-- Now remove the old address columns and status column
ALTER TABLE public.form_submissions 
DROP COLUMN address,
DROP COLUMN city, 
DROP COLUMN state,
DROP COLUMN zip_code,
DROP COLUMN status;

-- Create an index on submission_number for faster lookups
CREATE INDEX idx_form_submissions_submission_number ON public.form_submissions(submission_number);
