import React, { useState } from 'react';
import { GlossaryTerm } from '../data/articles';
import { BookMarked, ChevronDown, Wrench, Info } from 'lucide-react';

interface MechanicalGlossaryProps {
  terms: GlossaryTerm[];
  articleTitle: string;
}

export const MechanicalGlossary: React.FC<MechanicalGlossaryProps> = ({
  terms,
  articleTitle,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!terms || terms.length === 0) return null;

  return (
    <section
      aria-label="Interactive Technical Glossary"
      className="mt-14 bg-[#FBF9F5] border border-[#E7E2D8] rounded-xl p-6 sm:p-8"
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8] mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#143D2B] mb-1">
            <BookMarked className="w-4 h-4 text-[#143D2B]" />
            <span>Interactive Technical Glossary</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
            Core Engineering Principles
          </h3>
        </div>
        <span className="text-xs font-mono text-[#78716C] bg-[#EBE6DF] px-2.5 py-1 rounded">
          {terms.length} CONCEPTS DEFINED
        </span>
      </div>

      <p className="text-sm text-[#44403C] leading-relaxed mb-6 font-normal">
        Clear technical explanations of specialized engineering systems featured in this technical monograph.
      </p>

      <div className="space-y-3">
        {terms.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#F4F1EA] border border-[#E7E2D8] rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EBE6DF]/60 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-[#143D2B] shrink-0" />
                  <span className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">
                    {item.term}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#78716C] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-[#E7E2D8]/60 text-sm text-[#44403C] leading-relaxed">
                  <div className="flex items-start gap-2 bg-[#FBF9F5] p-3 rounded border border-[#E7E2D8]/80 text-xs sm:text-sm">
                    <Info className="w-4 h-4 text-[#143D2B] shrink-0 mt-0.5" />
                    <span>{item.definition}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
