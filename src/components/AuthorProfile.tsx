import React from 'react';
import { Author } from '../data/articles';
import { Award, MapPin, Calendar, Wrench, ShieldCheck } from 'lucide-react';

interface AuthorProfileProps {
  author: Author;
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ author }) => {
  return (
    <section
      aria-label="Author Profile & Specialized Expertise"
      className="mt-14 bg-[#F4F1EA] border border-[#E7E2D8] rounded-xl p-6 sm:p-8"
    >
      {/* Header Eyebrow */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8] mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#143D2B]">
          <ShieldCheck className="w-4 h-4 text-[#143D2B]" />
          <span>Curatorial Author Profile</span>
        </div>
        <span className="text-[11px] font-mono text-[#78716C] bg-[#EBE6DF] px-2 py-0.5 rounded">
          VERIFIED RESTORER
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Author Monogram Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#143D2B] text-[#FBF9F5] flex items-center justify-center font-serif font-bold text-2xl sm:text-3xl shrink-0 shadow-sm border-2 border-[#D6CEBE]">
          {author.avatarInitials || author.name.charAt(0)}
        </div>

        {/* Bio & Credentials Details */}
        <div className="flex-grow space-y-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              {author.name}
            </h3>
            <p className="text-sm font-medium text-[#143D2B] mt-0.5">
              {author.role}
            </p>

            {/* Unboxed Metadata Strip with Typographic Separators */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#78716C] mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>{author.location}</span>
              </span>
              <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>{author.yearsActive}</span>
              </span>
              <span aria-hidden="true" className="text-[#D6CEBE]">·</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>Archival Contributor</span>
              </span>
            </div>
          </div>

          {/* Author Narrative Bio */}
          <p className="text-sm sm:text-base text-[#44403C] leading-relaxed font-normal">
            {author.bio}
          </p>

          {/* Specialized Expertise Area */}
          <div className="pt-4 border-t border-[#E7E2D8]">
            <div className="flex items-center gap-2 mb-2.5">
              <Wrench className="w-3.5 h-3.5 text-[#143D2B]" />
              <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#143D2B]">
                Specialized Technical Expertise
              </span>
            </div>
            
            {/* Clean, unboxed expertise tags with subtle hairline styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {author.expertise.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-center gap-2 text-xs text-[#292524] bg-[#FBF9F5] border border-[#E7E2D8] py-2 px-3 rounded-md"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#143D2B]/70 shrink-0" />
                  <span className="font-medium line-clamp-1">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
