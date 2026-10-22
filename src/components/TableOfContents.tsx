import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, Check, ArrowUp } from 'lucide-react';
import { ArticleSection } from '../data/articles';

interface TableOfContentsProps {
  sections: ArticleSection[];
  activeSectionId: string;
  onNavigateSection: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  readTime: string;
  wordCount: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSectionId,
  onNavigateSection,
  isBookmarked,
  onToggleBookmark,
  readTime,
  wordCount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="lg:sticky lg:top-28 space-y-6">
      <div className="bg-[#F5F2EB] border border-[#EAE5DC] rounded-xl p-5 sm:p-6 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD3] mb-4">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B]">
            Table of Contents
          </span>
          <span className="text-[11px] text-[#78716C] font-mono tabular-nums">
            {sections.length} Sections
          </span>
        </div>

        {/* Section Anchor Links */}
        <nav className="space-y-1.5" aria-label="Article Table of Contents">
          {sections.map((section, idx) => {
            const isActive = activeSectionId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(section.id);
                }}
                className={`group flex items-start gap-2.5 py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#143D2B] text-[#FAF8F5] font-medium shadow-xs'
                    : 'text-[#44403C] hover:text-[#143D2B] hover:bg-[#EAE5DC]/60'
                }`}
              >
                <span
                  className={`font-mono text-[11px] shrink-0 ${
                    isActive ? 'text-[#D6CEBE]' : 'text-[#8C867E] group-hover:text-[#143D2B]'
                  }`}
                >
                  0{idx + 1}.
                </span>
                <span className="leading-snug line-clamp-1">{section.title}</span>
              </a>
            );
          })}
        </nav>

        {/* Reading Metadata */}
        <div className="mt-5 pt-4 border-t border-[#E2DDD3] flex items-center justify-between text-xs text-[#66615B]">
          <span>{readTime}</span>
          <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
          <span className="font-mono tabular-nums">{wordCount.toLocaleString()} words</span>
        </div>

        {/* Actions: Save & Share */}
        <div className="mt-4 pt-4 border-t border-[#E2DDD3] grid grid-cols-2 gap-2">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#143D2B] text-[#FAF8F5] border-[#143D2B]'
                : 'bg-[#FAF8F5] text-[#1C1917] border-[#E2DDD3] hover:bg-[#EBE6DF]'
            }`}
            aria-label={isBookmarked ? 'Remove from saved reading list' : 'Save to reading list'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#FAF8F5] text-[#1C1917] hover:bg-[#EBE6DF] rounded-lg border border-[#E2DDD3] transition-colors cursor-pointer"
            aria-label="Copy share link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#143D2B]" />
                <span className="text-[#143D2B] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#66615B]" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Jump to Top */}
      <button
        onClick={scrollToTop}
        className="w-full flex items-center justify-center gap-2 py-2 text-xs text-[#78716C] hover:text-[#143D2B] transition-colors cursor-pointer group"
      >
        <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        <span>Return to top of page</span>
      </button>
    </aside>
  );
};
