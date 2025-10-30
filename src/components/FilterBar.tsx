import type { Category } from '../lib/types';
import { Search } from 'lucide-react';

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  totalCount: number;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  totalCount,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquise por título..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <p className="text-center text-gray-600 font-medium">
          {totalCount} códigos encontrados
        </p>
      </div>
    </div>
  );
}
