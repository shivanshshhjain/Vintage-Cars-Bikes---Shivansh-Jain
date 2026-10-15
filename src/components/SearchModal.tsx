import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Gauge } from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();
  const results = cleanQuery
    ? ARTICLES.filter((art) => {
        return (
          art.title.toLowerCase().includes(cleanQuery) ||
          art.model.toLowerCase().includes(cleanQuery) ||
          art.make.toLowerCase().includes(cleanQuery) ||
          art.engine.toLowerCase().includes(cleanQuery) ||
          art.excerpt.toLowerCase().includes(cleanQuery) ||
          art.specs.some(
            (s) =>
              s.label.toLowerCase().includes(cleanQuery) ||
              s.value.toLowerCase().includes(cleanQuery)
          ) ||
          art.sections.some(
            (sec) =>
              sec.title.toLowerCase().includes(cleanQuery) ||
              sec.paragraphs.some((p) => p.toLowerCase().includes(cleanQuery)) ||
              sec.qaList?.some(
                (qa) =>
                  qa.question.toLowerCase().includes(cleanQuery) ||
                  qa.answer.toLowerCase().includes(cleanQuery)
              )
          )
        );
      })
    : ARTICLES;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBF9F5] rounded-xl shadow-2xl border border-[#E7E2D8] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E7E2D8] bg-[#F4F1EA]">
          <Search className="w-5 h-5 text-[#143D2B] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by car, motorcycle, carburetor, engine, or process..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1C1917] placeholder-[#78716C] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#78716C] hover:text-[#1C1917] rounded-md transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono font-medium text-[#78716C] px-2 py-1 rounded bg-[#EBE6DF] hover:bg-[#D6CEBE] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Count & Quick Filter Suggestions */}
        <div className="px-4 py-2 border-b border-[#E7E2D8] bg-[#FAF8F3] flex items-center justify-between text-xs text-[#78716C]">
          <span>
            {cleanQuery ? `${results.length} matches found` : 'All 10 Journal Articles'}
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <span>Suggestions:</span>
            <button
              onClick={() => setQuery('carburetor')}
              className="text-[#143D2B] hover:underline"
            >
              Carburetor
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setQuery('injection')}
              className="text-[#143D2B] hover:underline"
            >
              Injection
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setQuery('timing')}
              className="text-[#143D2B] hover:underline"
            >
              Timing
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#E7E2D8] p-2">
          {results.length > 0 ? (
            results.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art.slug);
                  onClose();
                }}
                className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[#F4F1EA] cursor-pointer transition-colors"
              >
                <div className="w-16 h-12 rounded bg-[#EBE6DF] overflow-hidden shrink-0 border border-[#E7E2D8]">
                  <img
                    src={art.image}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-[#78716C] mb-0.5">
                    <span className="font-semibold text-[#143D2B]">{art.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#143D2B] transition-colors truncate">
                    {art.shortTitle}
                  </h4>
                  <p className="text-xs text-[#78716C] truncate mt-0.5 font-mono">
                    {art.engine}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#143D2B] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#78716C] space-y-2">
              <p className="font-serif text-base text-[#1C1917]">No mechanical articles found</p>
              <p className="text-xs">
                Try searching for specific models (E-Type, RS 2.7, Bonneville) or components (Weber, SU, MFI).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
