import React, { useState } from 'react';
import { Article, ARTICLES } from '../data/articles';
import { Bookmark, Trash2, ArrowRight, BookOpen, Clock, FileText, Printer, Check } from 'lucide-react';

interface SavedPageProps {
  savedIds: string[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  savedIds,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('classic_throttle_notes');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [savedNoteSuccess, setSavedNoteSuccess] = useState<string | null>(null);

  const handleSaveNote = (id: string, text: string) => {
    const updated = { ...notes, [id]: text };
    setNotes(updated);
    try {
      localStorage.setItem('classic_throttle_notes', JSON.stringify(updated));
      setSavedNoteSuccess(id);
      setTimeout(() => setSavedNoteSuccess(null), 2000);
    } catch (e) {
      console.warn('Failed to save note', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const savedArticles = ARTICLES.filter((a) => savedIds.includes(a.id));

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#F5F2EB] border-b border-[#EAE5DC] py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-widest font-sans font-semibold text-[#143D2B] mb-2.5 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#143D2B] fill-current" />
              <span>Personal Curatorial Study Desk</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
              Saved Monographs & Workshop Notes
            </h1>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed font-serif">
              Your customized reading list of vintage automotive and motorcycle technical guides, saved for offline workshop reference and persistent across sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Action Utility Bar */}
      <div className="border-b border-[#EAE5DC] bg-[#FAF8F5] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#78716C]">
          <span>
            {savedArticles.length} Monograph{savedArticles.length === 1 ? '' : 's'} Bookmarked
          </span>
          <div className="flex items-center gap-4">
            {savedArticles.length > 0 && (
              <>
                <button
                  onClick={handlePrint}
                  className="hover:text-[#143D2B] font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#143D2B]" />
                  <span>Print Reading List</span>
                </button>
                <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
                <button
                  onClick={onClearAll}
                  className="hover:text-red-700 transition-colors font-medium cursor-pointer"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {savedArticles.length > 0 ? (
          <div className="space-y-6">
            {savedArticles.map((art) => (
              <div
                key={art.id}
                className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-5 sm:p-6 transition-all hover:border-[#143D2B]/60 hover:shadow-xs"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Thumbnail - Opens in New Tab */}
                  <a
                    href={`/articles/${art.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-56 aspect-[16/10] rounded-xl overflow-hidden bg-[#EFECE6] shrink-0 cursor-pointer border border-[#EAE5DC] block group"
                    title={`Open ${art.shortTitle} in a new tab`}
                  >
                    <img
                      src={art.image}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </a>

                  {/* Details & Workshop Note */}
                  <div className="flex-grow min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-[#78716C]">
                        <span className="font-semibold text-[#143D2B]">{art.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{art.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{art.readTime}</span>
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveBookmark(art.id)}
                        className="text-xs text-[#78716C] hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917] leading-snug">
                      <a
                        href={`/articles/${art.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#143D2B] transition-colors"
                        title={`Open ${art.shortTitle} in a new tab`}
                      >
                        {art.title}
                      </a>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#44403C] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>

                    {/* Workshop Study Notes Area */}
                    <div className="pt-3 border-t border-[#E7E2D8]/70">
                      <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-1.5">
                        <span className="font-medium text-[#143D2B] flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>Workshop & Restorer Study Notes</span>
                        </span>
                        {savedNoteSuccess === art.id && (
                          <span className="text-[#143D2B] font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Note saved!</span>
                          </span>
                        )}
                      </div>
                      <textarea
                        value={notes[art.id] || ''}
                        onChange={(e) => handleSaveNote(art.id, e.target.value)}
                        placeholder="Add your own restoration notes, needle specs, or project clearances for this vehicle..."
                        rows={2}
                        className="w-full text-xs p-2.5 bg-[#F5F2EB] border border-[#E2DDD3] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#143D2B] resize-y"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <a
                        href={`/articles/${art.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D2B] hover:underline"
                        title={`Open ${art.shortTitle} in a new tab`}
                      >
                        <span>Open Technical Monograph</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-[#78716C] bg-[#F4F1EA] rounded-xl border border-[#E7E2D8] p-8 max-w-xl mx-auto">
            <Bookmark className="w-12 h-12 mx-auto text-[#D6CEBE] mb-3" />
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-2">
              Your Study Desk is Empty
            </h2>
            <p className="text-xs leading-relaxed mb-5">
              Click the bookmark icon on any monograph or technical teardown to save it here for rapid access and note-taking.
            </p>
            <a
              href="/articles"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#143D2B] text-[#FBF9F5] text-xs font-semibold rounded hover:bg-[#1B5238] transition-colors"
            >
              <span>Explore Complete Monograph Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
