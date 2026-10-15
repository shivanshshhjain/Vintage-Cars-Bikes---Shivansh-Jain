import React from 'react';
import { Article, ARTICLES } from '../data/articles';
import { ArrowLeft, ArrowRight, Clock, BookOpen, Compass } from 'lucide-react';

interface NextReadsProps {
  currentArticle: Article;
  onSelectArticle: (slug: string) => void;
}

export const NextReads: React.FC<NextReadsProps> = ({
  currentArticle,
  onSelectArticle,
}) => {
  const currentIndex = ARTICLES.findIndex((a) => a.id === currentArticle.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : ARTICLES[ARTICLES.length - 1];
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : ARTICLES[0];

  // Up next recommendations: pick related items from same category or complementary engineering topic
  const recommendations = ARTICLES.filter((a) => a.id !== currentArticle.id)
    .sort((a, b) => (a.category === currentArticle.category ? -1 : 1))
    .slice(0, 3);

  return (
    <section aria-label="Next Reads and Related Offerings" className="mt-14 space-y-10">
      
      {/* Sequential Previous & Next Monograph Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Monograph */}
        <div
          onClick={() => onSelectArticle(prevArticle.slug)}
          className="group cursor-pointer p-4 bg-[#F4F1EA] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg transition-all flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-full bg-[#EBE6DF] group-hover:bg-[#143D2B] text-[#78716C] group-hover:text-[#FBF9F5] flex items-center justify-center shrink-0 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#78716C] mb-0.5">
              Previous Monograph
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#143D2B] truncate transition-colors">
              {prevArticle.shortTitle}
            </h4>
          </div>
        </div>

        {/* Next Monograph */}
        <div
          onClick={() => onSelectArticle(nextArticle.slug)}
          className="group cursor-pointer p-4 bg-[#F4F1EA] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg transition-all flex items-center justify-between gap-3.5 text-right"
        >
          <div className="min-w-0 flex-grow">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#78716C] mb-0.5">
              Next Monograph
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#143D2B] truncate transition-colors">
              {nextArticle.shortTitle}
            </h4>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#EBE6DF] group-hover:bg-[#143D2B] text-[#78716C] group-hover:text-[#FBF9F5] flex items-center justify-center shrink-0 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Up Next in the Archive: Curated Offerings */}
      <div className="pt-8 border-t border-[#E7E2D8]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#143D2B] mb-1">
              <Compass className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>Recommended Next Reads</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Deepen Your Mechanical Understanding
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="group cursor-pointer bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg p-4 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] rounded overflow-hidden bg-[#EBE6DF] mb-3">
                  <img
                    src={art.image}
                    alt={art.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#78716C] mb-1.5 font-medium">
                  <span className="text-[#143D2B] font-semibold">{art.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#143D2B] transition-colors leading-snug mb-2 line-clamp-2">
                  {art.shortTitle}
                </h4>
                <p className="text-xs text-[#44403C] line-clamp-2 leading-relaxed mb-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between text-xs">
                <span className="font-mono text-[#78716C] text-[11px] truncate max-w-[150px]">
                  {art.engine}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#143D2B] group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Read Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
