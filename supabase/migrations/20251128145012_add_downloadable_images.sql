/*
  # Add Downloadable Images to Code Snippets

  1. Modified Tables
    - `code_snippets`
      - `download_image_url` (text, nullable) - URL of the image users can download
      - `download_image_filename` (text, nullable) - Filename for the downloaded image

  2. Purpose
    - Some code snippets can have optional images that users can download
    - Each image has a custom filename for better organization
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'code_snippets' AND column_name = 'download_image_url'
  ) THEN
    ALTER TABLE code_snippets ADD COLUMN download_image_url text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'code_snippets' AND column_name = 'download_image_filename'
  ) THEN
    ALTER TABLE code_snippets ADD COLUMN download_image_filename text;
  END IF;
END $$;