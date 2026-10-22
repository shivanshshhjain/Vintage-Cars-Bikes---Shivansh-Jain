import React, { useState } from 'react';
import { Bookmark, Clock, Gauge, ExternalLink } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  onSelectArticle?: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const articleUrl = `/articles/${article.slug}`;

  return (
    <article
      className={`group bg-[#FAF8F5] border border-[#EAE5DC] hover:border-[#C4BDB1] rounded-xl transition-all duration-300 overflow-hidden flex flex-col relative hover:shadow-[0_4px_20px_-4px_rgba(20,61,43,0.06)] ${
        featured ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''
      }`}
    >
      {/* Visual Asset Container - Opens in New Tab */}
      <a
        href={articleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative overflow-hidden bg-[#EFECE6] block cursor-pointer ${
          featured ? 'lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px]' : 'aspect-[4/3] w-full'
        }`}
        aria-label={`Read ${article.title} in a new tab`}
        title={`Open ${article.shortTitle} in a new tab`}
      >
        {!imageError ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#EBE6DF] to-[#D6CEBE] text-[#44403C]">
            <Gauge className="w-10 h-10 mb-2 text-[#143D2B]/60" />
            <span className="font-serif text-sm font-semibold text-[#1C1917] text-center">
              {article.shortTitle}
            </span>
            <span className="text-xs text-[#78716C] mt-1">{article.engine}</span>
          </div>
        )}
      </a>

      {/* Quiet Bookmark Toggle */}
      <button
        onClick={(e) => onToggleBookmark(article.id, e)}
        className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
          isBookmarked
            ? 'bg-[#143D2B] text-[#FBF9F5] shadow-xs'
            : 'bg-[#FAF8F5]/85 text-[#66615B] hover:text-[#143D2B] hover:bg-white shadow-xs'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
        title={isBookmarked ? 'Saved to reading list' : 'Save to reading list'}
      >
        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
      </button>

      {/* Content Area */}
      <div
        className={`p-6 flex flex-col justify-between flex-grow ${
          featured ? 'lg:col-span-5 lg:p-8 lg:flex lg:flex-col lg:justify-center' : ''
        }`}
      >
        <div>
          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-[#66615B] mb-2.5 font-medium tracking-wide">
            <span className="text-[#143D2B] font-semibold uppercase text-[11px] tracking-wider">{article.categoryLabel}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span>{article.year}</span>
            <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-[#8C867E]" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Heading - Opens in New Tab */}
          <h2
            className={`font-serif font-bold text-[#1C1917] group-hover:text-[#143D2B] transition-colors leading-[1.2] mb-3 text-balance ${
              featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
          >
            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-[#143D2B]/30 underline-offset-4"
              title={`Open ${article.shortTitle} in a new tab`}
            >
              {article.shortTitle}
            </a>
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-[#44403C] leading-relaxed line-clamp-3 mb-5 font-normal">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info: Engine spec and Read Link */}
        <div className="pt-3.5 border-t border-[#EAE5DC] flex items-center justify-between text-xs">
          <span className="font-mono text-[#78716C] text-[11px] line-clamp-1 max-w-[200px]" title={article.engine}>
            {article.engine}
          </span>
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#143D2B] hover:text-[#1B5238] group-hover:translate-x-0.5 transition-transform"
            title={`Open ${article.shortTitle} in a new browser tab`}
          >
            <span>Read Monograph</span>
            <ExternalLink className="w-3 h-3 text-[#143D2B]" />
          </a>
        </div>
      </div>
    </article>
  );
};
