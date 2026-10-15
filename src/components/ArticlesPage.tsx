import React, { useState } from 'react';
import { Article, ARTICLES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { Search, SlidersHorizontal, BookOpen, Layers, ArrowUpDown, X } from 'lucide-react';

interface ArticlesPageProps {
  onSelectArticle: (slug: string) => void;
  savedIds: string[];
  onToggleBookmark: (id: string, e?: React.MouseEvent) => void;
  initialCategory?: 'all' | 'cars' | 'motorcycles';
  pageTitle?: string;
  pageSubtitle?: string;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onSelectArticle,
  savedIds,
  onToggleBookmark,
  initialCategory = 'all',
  pageTitle = 'The Complete Technical Archive',
  pageSubtitle = 'Browse all ten peer-reviewed engineering monographs with factory clearances and tuning protocols.',
}) => {
  const [category, setCategory] = useState<'all' | 'cars' | 'motorcycles'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'read-time' | 'title'>('year-desc');

  // Filter by category
  let filtered = category === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === category);

  // Filter by search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.make.toLowerCase().includes(q) ||
        a.model.toLowerCase().includes(q) ||
        a.engine.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    );
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'year-asc') return a.year - b.year;
    if (sortBy === 'title') return a.shortTitle.localeCompare(b.shortTitle);
    if (sortBy === 'read-time') return a.wordCount - b.wordCount;
    return 0;
  });

  return (
    <div className="bg-[#FBF9F5] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#F4F1EA] border-b border-[#E7E2D8] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B] mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#143D2B]" />
              <span>Dedicated Monograph Repository</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
              {pageTitle}
            </h1>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed font-serif">
              {pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter, Search & Sort Control Strip */}
      <div className="sticky top-20 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D8] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#EBE6DF] rounded-lg overflow-x-auto">
            <button
              onClick={() => {
                setCategory('all');
                window.history.pushState(null, '', '/classification/all-articles');
                window.dispatchEvent(new Event('popstate'));
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                category === 'all'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              All Articles ({ARTICLES.length})
            </button>
            <button
              onClick={() => {
                setCategory('cars');
                window.history.pushState(null, '', '/classification/classic-automobiles');
                window.dispatchEvent(new Event('popstate'));
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                category === 'cars'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              Automobiles (7)
            </button>
            <button
              onClick={() => {
                setCategory('motorcycles');
                window.history.pushState(null, '', '/classification/vintage-motorcycles');
                window.dispatchEvent(new Event('popstate'));
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                category === 'motorcycles'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              Motorcycles (3)
            </button>
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#F4F1EA] border border-[#E7E2D8] rounded-md text-[#1C1917] focus:outline-none focus:border-[#143D2B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#78716C] self-end sm:self-auto shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#143D2B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F4F1EA] border border-[#E7E2D8] rounded-md px-2.5 py-1.5 text-xs text-[#1C1917] focus:outline-none focus:border-[#143D2B] cursor-pointer"
              >
                <option value="year-desc">Year: Newest to Oldest</option>
                <option value="year-asc">Year: Oldest to Newest</option>
                <option value="read-time">Read Time: Shortest</option>
                <option value="title">Title: Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between text-xs text-[#78716C] mb-6">
          <span>Showing {filtered.length} technical monographs</span>
          {searchQuery && (
            <span>Filtered by "{searchQuery}"</span>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelectArticle={onSelectArticle}
                isBookmarked={savedIds.includes(art.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-[#78716C] bg-[#F4F1EA] rounded-xl border border-[#E7E2D8] p-8">
            <BookOpen className="w-10 h-10 mx-auto text-[#D6CEBE] mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
              No matching monographs found
            </h3>
            <p className="text-xs max-w-sm mx-auto mb-4">
              Try adjusting your search criteria or resetting filters to view all 10 articles.
            </p>
            <button
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#143D2B] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
