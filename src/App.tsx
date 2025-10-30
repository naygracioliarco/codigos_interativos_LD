import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { CodeSnippet, Category } from './lib/types';
import categoriesJson from './data/categories.json';
import snippetsJson from './data/code_snippets.json';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CodeCard from './components/CodeCard';

function App() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<CodeSnippet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [snippets, selectedCategory, searchQuery]);

  const fetchData = async () => {
    // Simula uma pequena latência para manter UX similar
    await new Promise((r) => setTimeout(r, 200));

    const localCategories = categoriesJson as Category[];
    const localSnippetsBase = snippetsJson as CodeSnippet[];

    // Anexa o objeto de categoria correspondente em cada snippet (equivalente ao select de relação)
    const categoriesById = new Map(localCategories.map((c) => [c.id, c]));
    const localSnippets: CodeSnippet[] = localSnippetsBase
      .map((s) => ({
        ...s,
        categories: categoriesById.get(s.category_id),
      }))
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    // Ordena categorias por nome como antes
    const orderedCategories = [...localCategories].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setCategories(orderedCategories);
    setSnippets(localSnippets);
    setLoading(false);
  };

  const filterSnippets = () => {
    let filtered = snippets;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (snippet) => snippet.category_id === selectedCategory
      );
    }

    if (searchQuery.trim() !== '') {
      const q = normalize(searchQuery);
      filtered = filtered.filter((snippet) => {
        const titleMatch = normalize(snippet.title).startsWith(q);
        const tagMatch = (snippet.tags || []).some((t) =>
          normalize(t).startsWith(q)
        );
        const categoryMatch = snippet.categories
          ? normalize(snippet.categories.name).startsWith(q)
          : false;
        return titleMatch || tagMatch || categoryMatch;
      });
    }

    setFilteredSnippets(filtered);
  };

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
