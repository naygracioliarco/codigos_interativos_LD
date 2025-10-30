/*
  # Create Code Library Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Category name (e.g., "Caça-palavra", "Ligar os pontos")
      - `slug` (text, unique) - URL-friendly version of name
      - `created_at` (timestamptz)
    
    - `code_snippets`
      - `id` (uuid, primary key)
      - `title` (text) - Short descriptive title
      - `description` (text) - Brief description of what the code does
      - `code` (text) - The actual code snippet
      - `category_id` (uuid, foreign key to categories)
      - `thumbnail_url` (text) - URL to the preview image
      - `tags` (text array) - Keywords for search
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (since this is a public library)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create code_snippets table
CREATE TABLE IF NOT EXISTS code_snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  code text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  thumbnail_url text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view code snippets"
  ON code_snippets FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_code_snippets_category_id ON code_snippets(category_id);
CREATE INDEX IF NOT EXISTS idx_code_snippets_tags ON code_snippets USING gin(tags);