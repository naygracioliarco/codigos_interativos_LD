import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  category_id: string;
  thumbnail_url: string;
  tags: string[];
  download_image_url?: string | null;
  download_image_filename?: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category;
}
