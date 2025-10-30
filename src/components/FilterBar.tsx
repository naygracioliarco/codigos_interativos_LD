import { Category } from '../lib/supabase';

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  totalCount: number;
  onCategoryChange: (categoryId: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  totalCount,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
