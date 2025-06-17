
-- First, let's handle this migration step by step to avoid sequence dependency issues

-- Step 1: Create the new table without using the existing sequence initially
CREATE TABLE public.form_submissions_new (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_number integer NOT NULL,
    restaurant_name text NOT NULL,
    full_address text NOT NULL,
    contact_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    menu_type text NOT NULL,
    menu_content text NOT NULL,
    material_preference text NOT NULL,
    additional_notes text,
    menu_images text[],
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Step 2: Copy all data from old table to new table
INSERT INTO public.form_submissions_new (
    id, submission_number, restaurant_name, full_address, contact_name, 
    email, phone, menu_type, menu_content, material_preference, 
    additional_notes, menu_images, created_at, updated_at
)
SELECT 
    id, submission_number, restaurant_name, full_address, contact_name,
    email, phone, menu_type, menu_content, material_preference,
    additional_notes, menu_images, created_at, updated_at
FROM public.form_submissions;

-- Step 3: Drop the old table with CASCADE to handle dependencies
DROP TABLE public.form_submissions CASCADE;

-- Step 4: Rename the new table
ALTER TABLE public.form_submissions_new RENAME TO form_submissions;

-- Step 5: Recreate the sequence and set it as default
CREATE SEQUENCE form_submissions_submission_number_seq;
SELECT setval('form_submissions_submission_number_seq', COALESCE((SELECT MAX(submission_number) FROM public.form_submissions), 0));
ALTER TABLE public.form_submissions ALTER COLUMN submission_number SET DEFAULT nextval('form_submissions_submission_number_seq'::regclass);

-- Step 6: Recreate the index on submission_number
CREATE INDEX idx_form_submissions_submission_number ON public.form_submissions(submission_number);
