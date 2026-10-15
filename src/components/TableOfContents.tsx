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
      <div className="bg-[#F4F1EA] border border-[#E7E2D8] rounded-lg p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8] mb-4">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#143D2B]">
            Table of Contents
          </span>
          <span className="text-xs text-[#78716C] font-mono tabular-nums">
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
                className={`group flex items-start gap-2.5 py-1.5 px-2.5 rounded text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#143D2B] text-[#FBF9F5] font-medium'
                    : 'text-[#44403C] hover:text-[#143D2B] hover:bg-[#EBE6DF]'
                }`}
              >
                <span
                  className={`font-mono text-[11px] shrink-0 ${
                    isActive ? 'text-[#D6CEBE]' : 'text-[#A8A29E] group-hover:text-[#143D2B]'
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
        <div className="mt-5 pt-4 border-t border-[#E7E2D8] flex items-center justify-between text-xs text-[#78716C]">
          <span>{readTime}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{wordCount.toLocaleString()} words</span>
        </div>

        {/* Actions: Save & Share */}
        <div className="mt-4 pt-4 border-t border-[#E7E2D8] grid grid-cols-2 gap-2">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#143D2B] text-[#FBF9F5] border-[#143D2B]'
                : 'bg-[#FBF9F5] text-[#1C1917] border-[#D6CEBE] hover:bg-[#EBE6DF]'
            }`}
            aria-label={isBookmarked ? 'Remove from saved reading list' : 'Save to reading list'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#FBF9F5] text-[#1C1917] hover:bg-[#EBE6DF] rounded border border-[#D6CEBE] transition-colors cursor-pointer"
            aria-label="Copy share link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#143D2B]" />
                <span className="text-[#143D2B] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
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
