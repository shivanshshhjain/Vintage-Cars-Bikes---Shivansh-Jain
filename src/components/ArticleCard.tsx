import React, { useState } from 'react';
import { Bookmark, Clock, ArrowRight, Gauge, ExternalLink } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      onSelectArticle(article.slug);
    }
  };

  return (
    <article
      className={`group bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B]/40 rounded-lg transition-all duration-200 overflow-hidden flex flex-col relative ${
        featured ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''
      }`}
    >
      {/* Visual Asset Container */}
      <a
        href={`/articles/${article.slug}`}
        onClick={handleClick}
        className={`relative overflow-hidden bg-[#EBE6DF] block cursor-pointer ${
          featured ? 'lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]' : 'aspect-[4/3] w-full'
        }`}
        aria-label={`Read ${article.title}`}
      >
        {!imageError ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
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
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
          isBookmarked
            ? 'bg-[#143D2B] text-[#FBF9F5] shadow-sm'
            : 'bg-[#FBF9F5]/90 text-[#44403C] hover:text-[#143D2B] hover:bg-white'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
        title={isBookmarked ? 'Saved to reading list' : 'Save to reading list'}
      >
        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
      </button>

      {/* Content Area */}
      <div
        className={`p-6 flex flex-col justify-between flex-grow ${
          featured ? 'lg:col-span-5 lg:p-8 lg:flex lg:flex-col lg:justify-center' : ''
        }`}
      >
        <div>
          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] mb-3 font-medium">
            <span className="text-[#143D2B] font-semibold">{article.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{article.year}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`font-serif font-bold text-[#1C1917] group-hover:text-[#143D2B] transition-colors leading-tight mb-3 text-balance ${
              featured ? 'text-2xl lg:text-3xl' : 'text-xl'
            }`}
          >
            <a
              href={`/articles/${article.slug}`}
              onClick={handleClick}
              className="hover:underline decoration-[#143D2B]/30"
            >
              {article.shortTitle}
            </a>
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-[#44403C] leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info: Engine spec and Read Link */}
        <div className="pt-4 border-t border-[#E7E2D8] flex items-center justify-between text-xs">
          <span className="font-mono text-[#78716C] line-clamp-1 max-w-[200px]" title={article.engine}>
            {article.engine}
          </span>
          <a
            href={`/articles/${article.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1 font-semibold text-[#143D2B] group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
