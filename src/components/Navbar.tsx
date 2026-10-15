import React, { useState, useRef, useEffect } from 'react';
import { Search, Bookmark, ExternalLink, ChevronDown, Car, Bike, Layers, Archive, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  savedCount: number;
}

export interface ClassificationItem {
  id: string;
  name: string;
  path: string;
  description: string;
  countLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CLASSIFICATIONS: ClassificationItem[] = [
  {
    id: 'classic-automobiles',
    name: 'Classic Automobiles',
    path: '/classification/classic-automobiles',
    description: 'Post-war sports cars, MFI calibration, SU balancing & coachwork',
    countLabel: '7 Monographs',
    icon: Car,
  },
  {
    id: 'vintage-motorcycles',
    name: 'Vintage Motorcycles',
    path: '/classification/vintage-motorcycles',
    description: 'British parallel-twins, Isolastic frame damping & shaft drives',
    countLabel: '3 Monographs',
    icon: Bike,
  },
  {
    id: 'all-articles',
    name: 'All Monographs',
    path: '/classification/all-articles',
    description: 'Complete technical archive of all 10 peer-reviewed engineering studies',
    countLabel: '10 Articles',
    icon: Layers,
  },
  {
    id: 'archival-resources',
    name: 'Archival Resources',
    path: '/classification/archival-resources',
    description: 'Historical factory blueprints, parts registries & workshop archives',
    countLabel: '30+ Registries',
    icon: Archive,
  },
  {
    id: 'reading-list',
    name: 'Saved Reading Desk',
    path: '/classification/reading-list',
    description: 'Personalized workshop reading queue and bookmarked specifications',
    countLabel: 'Saved Items',
    icon: Bookmark,
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  savedCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onNavigate('/');
                }
              }}
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] rounded-sm"
              aria-label="The Classic Throttle Home Journal"
            >
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#143D2B] group-hover:text-[#1B5238] transition-colors whitespace-nowrap">
                The Classic Throttle
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Bar Classifications with Unique URLs (Opens each in a Different Tab) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-[#44403C]" aria-label="Main Classifications">
            
            {/* Classification: Classic Automobiles */}
            <a
              href="/classification/classic-automobiles"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 pb-1 ${
                currentPath === '/classification/classic-automobiles' || currentPath === '/automobiles'
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
              title="Open Classic Automobiles Classification in a new browser tab"
              aria-label="Open Classic Automobiles Classification in a new tab"
            >
              <Car className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>Automobiles (7)</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E] hover:text-[#143D2B] opacity-70" />
            </a>

            {/* Classification: Vintage Motorcycles */}
            <a
              href="/classification/vintage-motorcycles"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 pb-1 ${
                currentPath === '/classification/vintage-motorcycles' || currentPath === '/motorcycles'
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
              title="Open Vintage Motorcycles Classification in a new browser tab"
              aria-label="Open Vintage Motorcycles Classification in a new tab"
            >
              <Bike className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>Motorcycles (3)</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E] hover:text-[#143D2B] opacity-70" />
            </a>

            {/* Classification: All Articles */}
            <a
              href="/classification/all-articles"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 pb-1 ${
                currentPath === '/classification/all-articles' || currentPath === '/articles'
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
              title="Open All Articles Classification in a new browser tab"
              aria-label="Open All Articles Classification in a new tab"
            >
              <Layers className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>All Articles</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E] hover:text-[#143D2B] opacity-70" />
            </a>

            {/* Classification Dropdown Selector for All Categories */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 text-xs font-semibold text-[#143D2B] bg-[#EBE6DF]/70 hover:bg-[#EBE6DF] px-2.5 py-1.5 rounded border border-[#E7E2D8] transition-colors cursor-pointer"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                title="Choose a classification to open in a new tab"
              >
                <span>Classifications</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#FBF9F5] rounded-lg shadow-xl border border-[#E7E2D8] py-2 z-50">
                  <div className="px-3.5 py-2 border-b border-[#E7E2D8] text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
                    Choose Classification (Opens in New Tab)
                  </div>
                  {CLASSIFICATIONS.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.id}
                        href={c.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-[#F4F1EA] transition-colors group cursor-pointer"
                        title={`Open ${c.name} in a new tab`}
                      >
                        <div className="p-1.5 rounded bg-[#EBE6DF] text-[#143D2B] shrink-0 mt-0.5 group-hover:bg-[#143D2B] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-[#1C1917] group-hover:text-[#143D2B]">
                              {c.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#78716C] bg-[#EBE6DF] px-1.5 py-0.2 rounded">
                              {c.countLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                            {c.description}
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#143D2B] shrink-0 mt-1" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Classification: Archival Resources */}
            <a
              href="/classification/archival-resources"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 pb-1 ${
                currentPath === '/classification/archival-resources' || currentPath === '/resources'
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
              title="Open Archival Resources in a new browser tab"
              aria-label="Open Archival Resources in a new tab"
            >
              <span>Archives</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E] hover:text-[#143D2B] opacity-70" />
            </a>

            {/* Classification: Saved Reading List */}
            <a
              href="/classification/reading-list"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#143D2B] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 pb-1 ${
                currentPath === '/classification/reading-list' || currentPath === '/saved'
                  ? 'text-[#143D2B] font-semibold border-b-2 border-[#143D2B]'
                  : ''
              }`}
              title="Open Saved Reading Desk in a new browser tab"
              aria-label="Open Saved Reading Desk in a new tab"
            >
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="text-xs font-mono font-medium text-[#143D2B] bg-[#EBE6DF] px-1.5 py-0.2 rounded">
                  {savedCount}
                </span>
              )}
              <ExternalLink className="w-3 h-3 text-[#A8A29E] hover:text-[#143D2B] opacity-70" />
            </a>
          </nav>

          {/* Zone 3: Search Utility & Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#44403C] hover:text-[#143D2B] bg-[#F4F1EA] hover:bg-[#EBE6DF] rounded-md border border-[#E7E2D8] transition-colors whitespace-nowrap cursor-pointer"
              title="Search articles (Ctrl+K)"
              aria-label="Search articles"
            >
              <Search className="w-3.5 h-3.5 text-[#143D2B]" />
              <span className="hidden sm:inline">Search Journal</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-[#E7E2D8] text-[#78716C] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#143D2B] bg-[#F4F1EA] hover:bg-[#EBE6DF] rounded-md border border-[#E7E2D8] transition-colors cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Classification Navigation"
            >
              {isMobileMenuOpen ? (
                <>
                  <X className="w-4 h-4" />
                  <span className="text-[11px] font-semibold">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  <span className="text-[11px] font-semibold">Classifications</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Full Classification Drawer (Every Classification opens in a different tab) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E7E2D8] bg-[#FBF9F5] py-4 px-2 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-[#78716C] flex items-center justify-between">
              <span>Classifications (Opens in New Tab)</span>
              <span className="text-[#143D2B] font-semibold">5 Unique URLs</span>
            </div>

            {CLASSIFICATIONS.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.id}
                  href={c.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F4F1EA] transition-colors group cursor-pointer"
                  title={`Open ${c.name} in a new browser tab`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-[#EBE6DF] text-[#143D2B] group-hover:bg-[#143D2B] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1C1917] group-hover:text-[#143D2B]">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-[#78716C]">
                        {c.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[10px] font-mono text-[#78716C] bg-[#EBE6DF] px-1.5 py-0.5 rounded">
                      {c.countLabel}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#143D2B]" />
                  </div>
                </a>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
