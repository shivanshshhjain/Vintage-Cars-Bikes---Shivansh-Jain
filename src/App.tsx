import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { ArticlesPage } from './components/ArticlesPage';
import { ResourcesPage } from './components/ResourcesPage';
import { SavedPage } from './components/SavedPage';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Article, ARTICLES } from './data/articles';
import { ExternalLink, Layers, Car, Bike, Archive } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  
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
      setCurrentPath(path);

      // Match /articles/:slug or /article/:slug
      const match = path.match(/\/(?:articles|article)\/([a-z0-9-]+)/i);
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

  // Dynamic Document Title, Canonical Link, and SEO Metadata Update following good title & URL rules
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    // Dynamic Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const fullCanonicalUrl = `${window.location.origin}${currentPath}`;
    canonical.setAttribute('href', fullCanonicalUrl);
    if (ogUrl) ogUrl.setAttribute('content', fullCanonicalUrl);
    
    if (currentSlug) {
      const activeArt = ARTICLES.find((a) => a.slug === currentSlug);
      if (activeArt) {
        // Title rule: Brand title format under 60 chars
        const pageTitle = `${activeArt.shortTitle} | The Classic Throttle`;
        document.title = pageTitle;
        if (ogTitle) ogTitle.setAttribute('content', pageTitle);
        if (metaDesc) metaDesc.setAttribute('content', activeArt.metaDescription);
        if (ogDesc) ogDesc.setAttribute('content', activeArt.metaDescription);
      }
    } else if (currentPath === '/classification/all-articles' || currentPath === '/articles') {
      const pageTitle = 'Technical Monographs Catalog | The Classic Throttle';
      const desc = 'Explore all ten peer-reviewed engineering monographs covering classic cars and vintage motorcycles with workshop manuals.';
      document.title = pageTitle;
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (metaDesc) metaDesc.setAttribute('content', desc);
      if (ogDesc) ogDesc.setAttribute('content', desc);
    } else if (
      currentPath === '/classification/classic-automobiles' ||
      currentPath === '/automobiles' ||
      currentPath === '/classification/cars'
    ) {
      const pageTitle = 'Classic Automobiles Archive | The Classic Throttle';
      const desc = 'Technical restoration monographs covering 7 legendary post-war sports cars including Jaguar E-Type, Aston Martin DB5, and Porsche 911 RS.';
      document.title = pageTitle;
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (metaDesc) metaDesc.setAttribute('content', desc);
      if (ogDesc) ogDesc.setAttribute('content', desc);
    } else if (
      currentPath === '/classification/vintage-motorcycles' ||
      currentPath === '/motorcycles' ||
      currentPath === '/classification/motorcycles'
    ) {
      const pageTitle = 'Vintage Motorcycles Archive | The Classic Throttle';
      const desc = 'Technical deep-dives into 3 iconic vintage motorcycles: Triumph Bonneville T120, Norton Commando 850, and Moto Guzzi V7 Sport.';
      document.title = pageTitle;
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (metaDesc) metaDesc.setAttribute('content', desc);
      if (ogDesc) ogDesc.setAttribute('content', desc);
    } else if (
      currentPath === '/classification/archival-resources' ||
      currentPath === '/resources'
    ) {
      const pageTitle = 'Technical Factory Archives | The Classic Throttle';
      const desc = 'Curated repository of external factory archives, blueprints, technical manuals, and international chassis registries.';
      document.title = pageTitle;
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (metaDesc) metaDesc.setAttribute('content', desc);
      if (ogDesc) ogDesc.setAttribute('content', desc);
    } else if (
      currentPath === '/classification/reading-list' ||
      currentPath === '/saved'
    ) {
      const pageTitle = 'Saved Reading Desk Notes | The Classic Throttle';
      const desc = 'Your personalized curatorial reading desk and workshop notes for vintage vehicle restoration.';
      document.title = pageTitle;
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (metaDesc) metaDesc.setAttribute('content', desc);
      if (ogDesc) ogDesc.setAttribute('content', desc);
    } else {
      const pageTitle = 'The Classic Throttle | Vintage Automotive Journal';
      const desc = 'In-depth technical restoration guides, carburetor tuning, and chassis engineering for legendary vintage sports cars and classic motorcycles.';
      document.title = pageTitle;
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      if (metaDesc) metaDesc.setAttribute('content', desc);
      if (ogDesc) ogDesc.setAttribute('content', desc);
    }
  }, [currentPath, currentSlug]);

  // Navigation Handlers
  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const match = path.match(/\/(?:articles|article)\/([a-z0-9-]+)/i);
    if (match && match[1]) {
      setCurrentSlug(match[1]);
    } else {
      setCurrentSlug(null);
    }
  };

  const handleSelectArticle = (slug: string) => {
    navigateTo(`/articles/${slug}`);
  };

  const handleNavigateHome = () => {
    navigateTo('/');
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

  // Render view based on URL route
  const renderView = () => {
    // 1. Article Detail View: /articles/:slug or /article/:slug
    if (currentArticle) {
      return (
        <ArticleDetail
          article={currentArticle}
          onNavigateHome={handleNavigateHome}
          onSelectArticle={handleSelectArticle}
          isBookmarked={savedIds.includes(currentArticle.id)}
          onToggleBookmark={() => handleToggleBookmark(currentArticle.id)}
        />
      );
    }

    // 2. Dedicated All Articles Catalog: /classification/all-articles or /articles
    if (currentPath === '/classification/all-articles' || currentPath === '/articles') {
      return (
        <ArticlesPage
          onSelectArticle={handleSelectArticle}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          initialCategory="all"
          pageTitle="Complete Technical Monograph Catalog"
          pageSubtitle="All ten peer-reviewed engineering teardowns with factory tolerances, clearances, and procedural guides."
        />
      );
    }

    // 3. Dedicated Classic Automobiles Classification: /classification/classic-automobiles or /automobiles
    if (
      currentPath === '/classification/classic-automobiles' ||
      currentPath === '/automobiles' ||
      currentPath === '/classification/cars'
    ) {
      return (
        <ArticlesPage
          onSelectArticle={handleSelectArticle}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          initialCategory="cars"
          pageTitle="Classic Automobiles Classification"
          pageSubtitle="Seven authoritative monographs on post-war sports car engineering, mechanical fuel injection, and coachwork preservation."
        />
      );
    }

    // 4. Dedicated Vintage Motorcycles Classification: /classification/vintage-motorcycles or /motorcycles
    if (
      currentPath === '/classification/vintage-motorcycles' ||
      currentPath === '/motorcycles' ||
      currentPath === '/classification/motorcycles'
    ) {
      return (
        <ArticlesPage
          onSelectArticle={handleSelectArticle}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          initialCategory="motorcycles"
          pageTitle="Vintage Motorcycles Classification"
          pageSubtitle="Three exhaustive technical guides covering British parallel-twins, Isolastic frame dampening, and Italian shaft-drive engineering."
        />
      );
    }

    // 5. Dedicated Resources / Technical Library: /classification/archival-resources or /resources
    if (
      currentPath === '/classification/archival-resources' ||
      currentPath === '/resources'
    ) {
      return <ResourcesPage onSelectArticle={handleSelectArticle} />;
    }

    // 6. Dedicated Saved Reading List: /classification/reading-list or /saved
    if (
      currentPath === '/classification/reading-list' ||
      currentPath === '/saved'
    ) {
      return (
        <SavedPage
          savedIds={savedIds}
          onSelectArticle={handleSelectArticle}
          onRemoveBookmark={(id) => handleToggleBookmark(id)}
          onClearAll={handleClearAllBookmarks}
        />
      );
    }

    // 7. Cover / Magazine Front Page: /
    const leadStory = ARTICLES[0];
    const secondaryStories = ARTICLES.slice(1, 4);
    const departmentStories = ARTICLES.slice(4);

    return (
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

              {/* Classification Cards Quick Jump - Opens in New Browser Tab */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="/classification/classic-automobiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3.5 bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg transition-all"
                  title="Open Classic Automobiles Classification in a new browser tab"
                >
                  <div className="flex items-center justify-between text-xs text-[#143D2B] font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5" />
                      <span>Classic Automobiles</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#143D2B]" />
                  </div>
                  <p className="text-[11px] text-[#78716C]">
                    7 Monographs · E-Type, DB5, Carrera RS, 300 SL & more
                  </p>
                </a>

                <a
                  href="/classification/vintage-motorcycles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3.5 bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg transition-all"
                  title="Open Vintage Motorcycles Classification in a new browser tab"
                >
                  <div className="flex items-center justify-between text-xs text-[#143D2B] font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Bike className="w-3.5 h-3.5" />
                      <span>Vintage Motorcycles</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#143D2B]" />
                  </div>
                  <p className="text-[11px] text-[#78716C]">
                    3 Monographs · Bonneville T120, Commando 850, V7 Sport
                  </p>
                </a>

                <a
                  href="/classification/archival-resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3.5 bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg transition-all"
                  title="Open Archival Resources in a new browser tab"
                >
                  <div className="flex items-center justify-between text-xs text-[#143D2B] font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Archive className="w-3.5 h-3.5" />
                      <span>Archival Resources</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#143D2B]" />
                  </div>
                  <p className="text-[11px] text-[#78716C]">
                    30+ Factory Archives, Blueprints & Registries
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>

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
                <a
                  href="/classification/all-articles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#143D2B] font-semibold hover:underline inline-flex items-center gap-1"
                  title="Open complete catalog in a new browser tab"
                >
                  <span>View All 10 Articles</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
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

          {/* Tier 3: Department Archive List */}
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
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#143D2B] selection:text-[#FBF9F5]">
      
      {/* Universal Top Bar with Classifications opening in new tabs */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={savedIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      {/* Universal Curatorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          if (cat === 'all') navigateTo('/classification/all-articles');
          else if (cat === 'cars') navigateTo('/classification/classic-automobiles');
          else if (cat === 'motorcycles') navigateTo('/classification/vintage-motorcycles');
        }}
        onNavigateHome={handleNavigateHome}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
