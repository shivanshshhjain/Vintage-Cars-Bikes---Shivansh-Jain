import React from 'react';

interface FooterProps {
  onSelectCategory: (cat: 'all' | 'cars' | 'motorcycles') => void;
  onNavigateHome: () => void;
  onSelectArticle: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome,
  onSelectArticle,
}) => {
  return (
    <footer className="bg-[#143D2B] text-[#F4F1EA] border-t border-[#0B2519] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1B5238]">
          
          {/* Brand & Editorial Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FBF9F5]">
              The Classic Throttle
            </h3>
            <p className="text-sm text-[#D6CEBE] leading-relaxed max-w-sm">
              An independent archival journal dedicated to the historical preservation, mechanical teardown, and tuning science of post-war classic sports cars and vintage motorcycles.
            </p>
            <div className="pt-2 text-xs text-[#A3B899] font-mono">
              ISSN 2974-8841 · Published in Coventry, Stuttgart & Mandello
            </div>
          </div>

          {/* Catalog Divisions */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-[#B08968]">
              Department Sections
            </h4>
            <ul className="space-y-2 text-xs text-[#D6CEBE]">
              <li>
                <a
                  href="/classification/classic-automobiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  title="Open Classic Automobiles Classification in a new tab"
                >
                  <span>Classic Automobiles (7 Monographs)</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/classification/vintage-motorcycles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  title="Open Vintage Motorcycles Classification in a new tab"
                >
                  <span>Vintage Motorcycles (3 Monographs)</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/classification/all-articles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  title="Open Complete Editorial Archive in a new tab"
                >
                  <span>Complete Editorial Archive (10 Articles)</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Mechanical Index Jump Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-[#B08968]">
              Featured Mechanical Monographs
            </h4>
            <ul className="space-y-2 text-xs text-[#D6CEBE]">
              <li>
                <a
                  href="/articles/1961-jaguar-e-type-rebuild"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left line-clamp-1 cursor-pointer inline-flex items-center gap-1.5"
                  title="Open 1961 Jaguar E-Type in a new tab"
                >
                  <span>1961 Jaguar E-Type 3.8 SU Carb Rebuild</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/articles/1973-porsche-911-carrera-rs-mfi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left line-clamp-1 cursor-pointer inline-flex items-center gap-1.5"
                  title="Open 1973 Porsche 911 RS in a new tab"
                >
                  <span>1973 Porsche 911 RS 2.7 MFI Calibration</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/articles/1974-norton-commando-850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left line-clamp-1 cursor-pointer inline-flex items-center gap-1.5"
                  title="Open 1974 Norton Commando in a new tab"
                >
                  <span>1974 Norton Commando Isolastic Mounts</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/articles/1972-moto-guzzi-v7-sport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-left line-clamp-1 cursor-pointer inline-flex items-center gap-1.5"
                  title="Open 1972 Moto Guzzi V7 Sport in a new tab"
                >
                  <span>1972 Moto Guzzi V7 Sport Bevel Shaft Setup</span>
                  <span className="text-[10px] text-[#A3B899] font-mono">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3B899] gap-4">
          <p>© {new Date().getFullYear()} The Classic Throttle Journal. All technical specifications cross-verified against factory service bulletins.</p>
          <div className="flex items-center gap-4 text-[#D6CEBE]">
            <span>Photographic assets optimized under 100 KB</span>
            <span aria-hidden="true">·</span>
            <span>Anchor-indexed navigation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
