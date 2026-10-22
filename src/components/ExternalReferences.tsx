import React from 'react';
import { ExternalReference } from '../data/articles';
import { ExternalLink, BookOpen, Compass, FileText, Bookmark } from 'lucide-react';

interface ExternalReferencesProps {
  references: ExternalReference[];
  variant?: 'compact' | 'full';
  articleTitle: string;
}

export const ExternalReferences: React.FC<ExternalReferencesProps> = ({
  references,
  variant = 'full',
  articleTitle,
}) => {
  if (!references || references.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className="p-3.5 bg-[#FAF8F3] border border-[#E7E2D8] rounded-lg">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-sans font-semibold text-[#143D2B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#143D2B]" />
            <span>Authoritative Technical & Archive Sources</span>
          </span>
          <span className="text-[11px] text-[#78716C] font-mono">
            {references.length} External References
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {references.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B] text-[#1C1917] hover:text-[#143D2B] rounded text-xs transition-colors"
              title={`${ref.source}: ${ref.description}`}
            >
              <span className="font-medium truncate max-w-[220px]">{ref.source}</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E] group-hover:text-[#143D2B] shrink-0" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Authoritative Technical References & External Archives"
      className="mt-14 bg-[#F5F2EB] border border-[#EAE5DC] rounded-xl p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2DDD3] mb-6 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#143D2B] mb-1">
            <Compass className="w-4 h-4 text-[#143D2B]" />
            <span>Archival Reference & Deeper Understanding Links</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
            Historical Societies, Registries & Factory Archives
          </h3>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#66615B] bg-[#EBE6DF] px-2.5 py-1 rounded self-start sm:self-auto">
          VERIFIED EXTERNAL SOURCES
        </span>
      </div>

      <p className="text-sm text-[#44403C] leading-relaxed mb-6 font-normal">
        To foster a deeper historical and mechanical understanding of the <strong className="text-[#1C1917]">{articleTitle}</strong>, our curatorial team has verified the following external technical registries, museum blueprints, and factory service archives.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {references.map((ref, idx) => (
          <a
            key={idx}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4.5 bg-[#FAF8F5] border border-[#E2DDD3] hover:border-[#143D2B] rounded-xl transition-all hover:shadow-xs"
          >
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-2">
              <span className="text-[10px] font-mono text-[#143D2B] font-semibold uppercase tracking-wider">
                {ref.category.toUpperCase()}
              </span>
              <span className="text-[11px] text-[#8C867E] group-hover:text-[#143D2B] flex items-center gap-1 font-medium transition-colors">
                <span>Visit Archive</span>
                <ExternalLink className="w-3 h-3 text-[#143D2B]" />
              </span>
            </div>

            <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#143D2B] transition-colors leading-snug mb-1">
              {ref.title}
            </h4>

            <div className="text-xs text-[#143D2B] font-medium mb-2 font-mono">
              Source: {ref.source}
            </div>

            <p className="text-xs text-[#44403C] leading-relaxed line-clamp-2">
              {ref.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};
