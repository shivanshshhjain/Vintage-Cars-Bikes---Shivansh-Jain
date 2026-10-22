import React, { useState } from 'react';
import { ARTICLES, ExternalReference } from '../data/articles';
import { Compass, ExternalLink, BookOpen, Search, ShieldCheck, ArrowRight } from 'lucide-react';

interface ResourcesPageProps {
  onSelectArticle: (slug: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onSelectArticle }) => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // Collect all references with their parent article
  const allRefs: { ref: ExternalReference; articleSlug: string; articleTitle: string }[] = [];
  ARTICLES.forEach((art) => {
    art.externalReferences.forEach((r) => {
      allRefs.push({
        ref: r,
        articleSlug: art.slug,
        articleTitle: art.shortTitle,
      });
    });
  });

  const filtered = allRefs.filter((item) => {
    const matchesCat = filterCat === 'all' || item.ref.category === filterCat;
    const matchesQuery =
      !query.trim() ||
      item.ref.title.toLowerCase().includes(query.toLowerCase()) ||
      item.ref.source.toLowerCase().includes(query.toLowerCase()) ||
      item.ref.description.toLowerCase().includes(query.toLowerCase()) ||
      item.articleTitle.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#F5F2EB] border-b border-[#EAE5DC] py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-widest font-sans font-semibold text-[#143D2B] mb-2.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#143D2B]" />
              <span>Archival Research Room</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
              Historical Technical Archives & Registries
            </h1>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed font-serif">
              A curated repository of verified external factory manuals, museum technical blueprints, and international chassis registries for deeper scholarly and mechanical investigation.
            </p>
          </div>
        </div>
      </section>

      {/* Control Bar */}
      <div className="sticky top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1 p-1 bg-[#EAE5DC] rounded-lg overflow-x-auto text-xs">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
                filterCat === 'all' ? 'bg-[#143D2B] text-[#FAF8F5] shadow-xs' : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              All Archives ({allRefs.length})
            </button>
            <button
              onClick={() => setFilterCat('Factory Manual')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
                filterCat === 'Factory Manual' ? 'bg-[#143D2B] text-[#FAF8F5] shadow-xs' : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              Factory Manuals
            </button>
            <button
              onClick={() => setFilterCat('Historical Archive')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
                filterCat === 'Historical Archive' ? 'bg-[#143D2B] text-[#FAF8F5] shadow-xs' : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              Historical Archives
            </button>
            <button
              onClick={() => setFilterCat('Technical Blueprint')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
                filterCat === 'Technical Blueprint' ? 'bg-[#143D2B] text-[#FAF8F5] shadow-xs' : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              Blueprints
            </button>
            <button
              onClick={() => setFilterCat('Registry')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
                filterCat === 'Registry' ? 'bg-[#143D2B] text-[#FAF8F5] shadow-xs' : 'text-[#44403C] hover:text-[#1C1917]'
              }`}
            >
              Registries
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search references..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F2EB] border border-[#E2DDD3] rounded-md text-[#1C1917] focus:outline-none focus:border-[#143D2B]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Verified References */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#143D2B] transition-all hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#78716C] mb-2">
                  <span className="font-mono text-[#143D2B] font-semibold text-[10px] uppercase tracking-wider">
                    {item.ref.category.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#A8A29E]">
                    <ShieldCheck className="w-3 h-3 text-[#143D2B]" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#1C1917] mb-1.5 leading-snug">
                  {item.ref.title}
                </h3>

                <div className="text-xs font-mono font-medium text-[#143D2B] mb-2.5">
                  Authority: {item.ref.source}
                </div>

                <p className="text-xs text-[#44403C] leading-relaxed mb-4">
                  {item.ref.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between text-xs">
                <a
                  href={`/articles/${item.articleSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#78716C] hover:text-[#143D2B] truncate max-w-[150px] text-left cursor-pointer inline-flex items-center gap-1 hover:underline"
                  title={`Open Monograph: ${item.articleTitle} in a new tab`}
                >
                  <span>In: {item.articleTitle}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[#A8A29E]" />
                </a>
                <a
                  href={item.ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#143D2B] hover:underline shrink-0"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
