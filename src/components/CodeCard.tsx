import { Copy, Eye, Code2, Check } from 'lucide-react';
import { useState } from 'react';
import type { CodeSnippet } from '../lib/types';

interface CodeCardProps {
  snippet: CodeSnippet;
}

export default function CodeCard({ snippet }: CodeCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);


  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-3">
            <img
              src={snippet.thumbnail_url}
              alt={snippet.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {snippet.title}
              </h3>
              {snippet.categories && (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                  {snippet.categories.name}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {snippet.description}
            </p>

            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {snippet.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-lg transition-colors font-medium ${
                  copied
                    ? 'border-green-300 text-green-700 bg-green-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                aria-live="polite"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <pre className="text-sm text-gray-800 overflow-x-auto">
              <code>{snippet.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
