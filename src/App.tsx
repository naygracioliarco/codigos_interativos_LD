import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase, CodeSnippet, Category } from './lib/supabase';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CodeCard from './components/CodeCard';

function App() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<CodeSnippet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [snippets, selectedCategory]);

  const fetchData = async () => {
    try {
      const [categoriesResult, snippetsResult] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase
          .from('code_snippets')
          .select('*, categories(*)')
          .order('created_at', { ascending: false }),
      ]);

      if (categoriesResult.data) {
        setCategories(categoriesResult.data);
      }

      if (snippetsResult.data) {
        setSnippets(snippetsResult.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSnippets = () => {
    let filtered = snippets;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (snippet) => snippet.category_id === selectedCategory
      );
    }

    setFilteredSnippets(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando biblioteca...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        totalCount={filteredSnippets.length}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum código encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => (
              <CodeCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
