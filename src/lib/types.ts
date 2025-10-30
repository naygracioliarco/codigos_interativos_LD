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
  created_at: string;
  updated_at: string;
  categories?: Category;
}


