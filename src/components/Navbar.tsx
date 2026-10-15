import React from 'react';
import { Search, Bookmark, Compass } from 'lucide-react';

interface NavbarProps {
  currentCategory: 'all' | 'cars' | 'motorcycles';
  onSelectCategory: (cat: 'all' | 'cars' | 'motorcycles') => void;
  onNavigateHome: () => void;
  onOpenSearch: () => void;
  onToggleSavedDrawer: () => void;
  savedCount: number;
  currentSlug: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  onNavigateHome,
  onOpenSearch,
  onToggleSavedDrawer,
  savedCount,
  currentSlug,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateHome}
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-sm"
              aria-label="The Classic Throttle Home"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#143D2B] group-hover:text-[#1B5238] transition-colors whitespace-nowrap">
                The Classic Throttle
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44403C]" aria-label="Main Navigation">
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('all');
              }}
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap cursor-pointer pb-1 ${
                currentCategory === 'all' && !currentSlug
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
            >
              All Articles
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('cars');
              }}
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap cursor-pointer pb-1 ${
                currentCategory === 'cars' && !currentSlug
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
            >
              Classic Automobiles
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('motorcycles');
              }}
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap cursor-pointer pb-1 ${
                currentCategory === 'motorcycles' && !currentSlug
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
            >
              Vintage Motorcycles
            </button>
            <button
              onClick={onToggleSavedDrawer}
              className="hover:text-[#143D2B] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 pb-1"
            >
              <span>Saved Reading List</span>
              {savedCount > 0 && (
                <span className="text-xs font-mono font-medium text-[#143D2B] bg-[#EBE6DF] px-1.5 py-0.2 rounded">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action & Utility */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#44403C] hover:text-[#143D2B] bg-[#F4F1EA] hover:bg-[#EBE6DF] rounded-md border border-[#E7E2D8] transition-colors whitespace-nowrap cursor-pointer"
              title="Search articles (Ctrl+K)"
              aria-label="Search articles"
            >
              <Search className="w-3.5 h-3.5 text-[#143D2B]" />
              <span className="hidden sm:inline">Search Journal</span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-[#E7E2D8] text-[#78716C] rounded">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={onToggleSavedDrawer}
              className="md:hidden p-2 text-[#44403C] hover:text-[#143D2B] rounded-md hover:bg-[#F4F1EA] transition-colors relative cursor-pointer"
              aria-label="View saved articles"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-mono font-bold bg-[#143D2B] text-[#FBF9F5] rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
