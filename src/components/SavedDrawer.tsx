import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedSlugs: string[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedSlugs,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter((a) => savedSlugs.includes(a.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Reading List"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl border-l border-[#E7E2D8] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E7E2D8] bg-[#F4F1EA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#143D2B] fill-current" />
            <h3 className="font-serif font-bold text-lg text-[#1C1917]">
              Saved Reading List
            </h3>
            <span className="text-xs font-mono bg-[#EBE6DF] px-2 py-0.5 rounded text-[#143D2B] font-semibold">
              {savedArticles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-md transition-colors"
            aria-label="Close saved drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {savedArticles.length > 0 ? (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-3.5 rounded-lg bg-[#F4F1EA] border border-[#E7E2D8] hover:border-[#143D2B]/50 transition-colors flex gap-3.5 items-start"
              >
                <a
                  href={`/articles/${art.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-16 rounded overflow-hidden bg-[#EBE6DF] shrink-0 cursor-pointer block"
                  title={`Open ${art.shortTitle} in a new tab`}
                >
                  <img
                    src={art.image}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </a>
                <div className="flex-grow min-w-0">
                  <div className="text-[10px] text-[#78716C] mb-0.5">
                    <span className="font-semibold text-[#143D2B]">{art.categoryLabel}</span> · <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#1C1917] line-clamp-2 transition-colors">
                    <a
                      href={`/articles/${art.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#143D2B]"
                      title={`Open ${art.shortTitle} in a new tab`}
                    >
                      {art.shortTitle}
                    </a>
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <a
                      href={`/articles/${art.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#143D2B] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      title={`Open ${art.shortTitle} in a new tab`}
                    >
                      <span>Read monograph</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-[#A8A29E] hover:text-red-700 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-[#78716C] space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-[#D6CEBE]" />
              <p className="font-serif text-base text-[#1C1917]">Your reading list is empty</p>
              <p className="text-xs max-w-xs mx-auto leading-relaxed">
                Click the bookmark icon on any of the 10 vintage car or motorcycle articles to save them for offline reference.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#E7E2D8] bg-[#F4F1EA] flex items-center justify-between">
            <span className="text-xs text-[#78716C]">
              Stored in browser local memory
            </span>
            <button
              onClick={onClearAll}
              className="text-xs text-stone-600 hover:text-red-700 font-medium underline cursor-pointer"
            >
              Clear all bookmarks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
