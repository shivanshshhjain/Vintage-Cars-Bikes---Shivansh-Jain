import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { SearchModal } from './components/SearchModal';
import { SavedDrawer } from './components/SavedDrawer';
import { Footer } from './components/Footer';
import { Article, ARTICLES } from './data/articles';
import { Compass, BookOpen, Layers, CheckCircle2, Bookmark, SlidersHorizontal, ArrowRight, Gauge, Wrench } from 'lucide-react';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cars' | 'motorcycles'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  
  // Persistent bookmarks from localStorage
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('classic_throttle_bookmarks');
      return stored ? JSON.parse(stored) : ['jaguar-e-type-1961', 'porsche-911-carrera-rs-1973'];
    } catch {
      return ['jaguar-e-type-1961', 'porsche-911-carrera-rs-1973'];
    }
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('classic_throttle_bookmarks', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [savedIds]);

  // Synchronize URL paths and browser history
  useEffect(() => {
    const parseUrl = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const match = path.match(/\/article\/([a-z0-9-]+)/i);
      if (match && match[1]) {
        setCurrentSlug(match[1]);
        if (hash) {
          setTimeout(() => {
            const anchor = document.getElementById(hash.replace('#', ''));
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else {
        setCurrentSlug(null);
      }
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dynamic Document Title and SEO Metadata Update
  useEffect(() => {
    if (currentSlug) {
      const activeArt = ARTICLES.find((a) => a.slug === currentSlug);
      if (activeArt) {
        document.title = activeArt.seoTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', activeArt.metaDescription);
      }
    } else {
      document.title = 'The Classic Throttle – Vintage Automotive Journal';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Explore in-depth technical restoration guides, carburetor tuning, and chassis engineering for legendary vintage sports cars and classic motorcycles.'
        );
      }
    }
  }, [currentSlug]);

  // Navigation Handlers
  const handleSelectArticle = (slug: string) => {
    setCurrentSlug(slug);
    window.history.pushState(null, '', `/article/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentSlug(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAllBookmarks = () => {
    setSavedIds([]);
  };

  // Find active article if in detail view
  const currentArticle = currentSlug
    ? ARTICLES.find((a) => a.slug === currentSlug) || null
    : null;

  // Filtered articles for home catalog
  const filteredArticles = categoryFilter === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === categoryFilter);

  // Curatorial Front-Page 3-Tier Split
  const leadStory = filteredArticles[0];
  const secondaryStories = filteredArticles.slice(1, 4);
  const departmentStories = filteredArticles.slice(4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#143D2B] selection:text-[#FBF9F5]">
      
      {/* Universal Top Bar */}
      <Navbar
        currentCategory={categoryFilter}
        onSelectCategory={(cat) => {
          setCategoryFilter(cat);
          if (currentSlug) handleNavigateHome();
        }}
        onNavigateHome={handleNavigateHome}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSavedDrawer={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIds.length}
        currentSlug={currentSlug}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentArticle ? (
          /* Article Detail View with Anchor Links & Q&A Processes */
          <ArticleDetail
            article={currentArticle}
            onNavigateHome={handleNavigateHome}
            onSelectArticle={handleSelectArticle}
            isBookmarked={savedIds.includes(currentArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(currentArticle.id)}
          />
        ) : (
          /* Catalog Front-Page View */
          <div>
            {/* Curatorial Header Banner */}
            <section className="border-b border-[#E7E2D8] bg-[#F4F1EA] py-12 lg:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <div className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B] mb-3">
                    VOLUME XI · THE RESTORATION & TUNING ISSUE
                  </div>
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] mb-5 leading-[1.12]">
                    The Heritage of Internal Combustion.
                  </h1>
                  <p className="text-base sm:text-lg text-[#44403C] leading-relaxed font-serif">
                    Ten definitive technical monographs spanning post-war sports car engineering and iconic British and Italian parallel-twins. Each article contains verified factory clearances, step-by-step rebuild procedures, and diagnostic Q&A for the dedicated restorer.
                  </p>

                  {/* Operational Utility Strip */}
                  <div className="mt-6 pt-5 border-t border-[#E7E2D8] flex flex-wrap items-center gap-6 text-xs text-[#78716C]">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#143D2B]" />
                      <span><strong>10</strong> Published Monographs</span>
                    </div>
                    <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-[#143D2B]" />
                      <span>7 Classic Cars · 3 Vintage Motorcycles</span>
                    </div>
                    <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                    <div className="flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-[#143D2B]" />
                      <span>Procedural Q&A Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Catalog Filter Controls Bar */}
            <div className="sticky top-20 z-30 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E7E2D8] py-3.5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Category Segmented Control Tabs */}
                <div className="flex items-center gap-1 p-1 bg-[#EBE6DF] rounded-lg">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      categoryFilter === 'all'
                        ? 'bg-[#143D2B] text-white shadow-xs'
                        : 'text-[#44403C] hover:text-[#1C1917]'
                    }`}
                  >
                    All Articles (10)
                  </button>
                  <button
                    onClick={() => setCategoryFilter('cars')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      categoryFilter === 'cars'
                        ? 'bg-[#143D2B] text-white shadow-xs'
                        : 'text-[#44403C] hover:text-[#1C1917]'
                    }`}
                  >
                    Classic Automobiles (7)
                  </button>
                  <button
                    onClick={() => setCategoryFilter('motorcycles')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      categoryFilter === 'motorcycles'
                        ? 'bg-[#143D2B] text-white shadow-xs'
                        : 'text-[#44403C] hover:text-[#1C1917]'
                    }`}
                  >
                    Vintage Motorcycles (3)
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#78716C]">
                  <span>Showing {filteredArticles.length} monographs</span>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => setIsSavedDrawerOpen(true)}
                    className="hover:text-[#143D2B] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved ({savedIds.length})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Catalog Content Grid: 3-Tier Curatorial Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              
              {/* Tier 1: Lead Feature Story */}
              {leadStory && (
                <section aria-label="Lead Editorial Feature">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B]">
                      Lead Feature Monograph
                    </span>
                    <span className="text-xs text-[#78716C] font-mono">
                      PRIMARY EXHIBIT
                    </span>
                  </div>
                  <ArticleCard
                    article={leadStory}
                    onSelectArticle={handleSelectArticle}
                    isBookmarked={savedIds.includes(leadStory.id)}
                    onToggleBookmark={handleToggleBookmark}
                    featured={true}
                  />
                </section>
              )}

              {/* Tier 2: Secondary Feature Articles (3 Columns) */}
              {secondaryStories.length > 0 && (
                <section aria-label="Secondary Technical Features">
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-[#E7E2D8]">
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B]">
                      Selected Technical Monographs
                    </span>
                    <span className="text-xs text-[#78716C] font-mono">
                      CURATED SELECTION
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {secondaryStories.map((art) => (
                      <ArticleCard
                        key={art.id}
                        article={art}
                        onSelectArticle={handleSelectArticle}
                        isBookmarked={savedIds.includes(art.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Tier 3: Department Archive List (Remaining Articles) */}
              {departmentStories.length > 0 && (
                <section aria-label="Department Archive Monographs">
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-[#E7E2D8]">
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B]">
                      Archival Engineering Monographs
                    </span>
                    <span className="text-xs text-[#78716C] font-mono">
                      ARCHIVE REGISTRY
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentStories.map((art) => (
                      <ArticleCard
                        key={art.id}
                        article={art}
                        onSelectArticle={handleSelectArticle}
                        isBookmarked={savedIds.includes(art.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        )}
      </main>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      {/* Saved Bookmarks Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedSlugs={savedIds}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={(id) => handleToggleBookmark(id)}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Universal Curatorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setCategoryFilter(cat);
          handleNavigateHome();
        }}
        onNavigateHome={handleNavigateHome}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
