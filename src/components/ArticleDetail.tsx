import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Wrench,
  HelpCircle,
  CheckCircle,
  ChevronRight,
  Gauge,
  Link2,
  ArrowDownRight,
  Check,
} from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';
import { TableOfContents } from './TableOfContents';
import { AuthorProfile } from './AuthorProfile';

interface ArticleDetailProps {
  article: Article;
  onNavigateHome: () => void;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onNavigateHome,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(article.sections[0]?.id || 'overview');
  const [imageError, setImageError] = useState<boolean>(false);
  const [copiedAnchor, setCopiedAnchor] = useState<string | null>(null);

  // Scrollspy to update active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    article.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article]);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
      setActiveSectionId(sectionId);
    }
  };

  const handleCopyAnchor = async (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigateSection(sectionId);
    try {
      const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedAnchor(sectionId);
        setTimeout(() => setCopiedAnchor(null), 2000);
      }
    } catch {
      setCopiedAnchor(sectionId);
      setTimeout(() => setCopiedAnchor(null), 2000);
    }
  };

  // Helper to extract a short key phrase from a paragraph to use as anchor context
  const getContextSentence = (para: string): string => {
    const sentences = para.split('. ');
    if (sentences.length > 0) {
      const s = sentences[0].trim();
      return s.length > 90 ? `${s.substring(0, 87)}...` : `${s}.`;
    }
    return para.substring(0, 75);
  };

  // Other articles in the same category or overall
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="bg-[#FBF9F5] min-h-screen pb-24">
      {/* Editorial Breadcrumbs & Back Bar */}
      <div className="border-b border-[#E7E2D8] bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-[#78716C]">
          <nav className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#143D2B] transition-colors cursor-pointer"
            >
              The Classic Throttle
            </button>
            <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
            <span>{article.categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
            <span className="text-[#1C1917] font-medium truncate max-w-[240px] sm:max-w-md">
              {article.shortTitle}
            </span>
          </nav>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 text-[#143D2B] font-semibold hover:underline shrink-0 ml-4 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog</span>
          </button>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        {/* Article Header */}
        <header className="max-w-4xl mb-8">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C] mb-4 font-medium">
            <span className="text-[#143D2B] font-bold tracking-wider uppercase text-[11px]">
              {article.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.year}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{article.publishedDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{article.wordCount} words</span>
          </div>

          {/* Primary <h1> Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.15] mb-5 text-balance">
            {article.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="text-lg sm:text-xl text-[#44403C] leading-relaxed font-serif italic mb-6">
            {article.excerpt}
          </p>

          {/* Quick-Jump In-Page Anchor Navigation Strip */}
          <div className="p-3.5 bg-[#F4F1EA] border border-[#E7E2D8] rounded-lg mb-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-2 font-semibold flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-[#143D2B]" />
              <span>Direct In-Article Anchor Navigation</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {article.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateSection(sec.id);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FBF9F5] border border-[#E7E2D8] hover:border-[#143D2B] text-[#1C1917] hover:text-[#143D2B] rounded transition-colors"
                >
                  <span className="text-[#143D2B] font-mono font-bold">#</span>
                  <span className="font-medium">{sec.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Byline */}
          <div className="flex items-center gap-3 py-3 border-y border-[#E7E2D8]">
            <div className="w-9 h-9 rounded-full bg-[#143D2B] text-[#FBF9F5] flex items-center justify-center font-serif font-bold text-sm">
              {article.author.avatarInitials || article.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#1C1917]">{article.author.name}</div>
              <div className="text-[11px] text-[#78716C]">{article.author.role}</div>
            </div>
          </div>
        </header>

        {/* Lead Image & Caption (Optimized under 100 KB with explicit alt text) */}
        <figure className="mb-12 max-w-5xl">
          <div className="rounded-lg overflow-hidden border border-[#E7E2D8] bg-[#EBE6DF] aspect-[16/10] sm:aspect-[16/9] relative">
            {!imageError ? (
              <img
                src={article.image}
                alt={article.imageAlt}
                width={720}
                height={540}
                loading="eager"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-[#44403C] bg-gradient-to-br from-[#EBE6DF] to-[#D6CEBE]">
                <Gauge className="w-12 h-12 text-[#143D2B]/70 mb-3" />
                <span className="font-serif text-base font-bold text-[#1C1917]">{article.shortTitle}</span>
                <span className="text-xs text-[#78716C] mt-1">{article.engine}</span>
              </div>
            )}
          </div>
          <figcaption className="text-xs font-serif italic text-[#78716C] mt-2.5 px-1 leading-normal">
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Main Editorial Grid: Left/Center Reading Column + Sticky Table of Contents */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Main Reading Column (Col 1-8) */}
          <div className="lg:col-span-8 space-y-12 max-w-3xl">
            {article.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-[#E7E2D8] pb-10 last:border-b-0"
              >
                {/* Section Header with Proper Descriptive Anchor Link */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#143D2B] font-bold tracking-wider">
                    SECTION 0{idx + 1} · {section.id.toUpperCase().replace('-', ' ')}
                  </span>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleCopyAnchor(section.id, e)}
                    className="text-xs text-[#78716C] hover:text-[#143D2B] inline-flex items-center gap-1.5 transition-colors font-mono cursor-pointer"
                    title={`Click to copy direct link to ${section.title}`}
                  >
                    {copiedAnchor === section.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#143D2B]" />
                        <span className="text-[#143D2B] font-sans font-semibold">Anchor Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-3.5 h-3.5 text-[#143D2B]" />
                        <span>#{section.id}</span>
                      </>
                    )}
                  </a>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-2">
                  {section.title}
                </h2>

                {section.subheading && (
                  <h3 className="text-sm uppercase tracking-wider font-sans font-semibold text-[#143D2B] mb-5">
                    {section.subheading}
                  </h3>
                )}

                {/* Section Paragraphs with Contextual Anchor Links placed directly below specific sentences */}
                <div className="space-y-6 text-base leading-relaxed text-[#292524] font-normal">
                  {section.paragraphs.map((para, pIdx) => {
                    const sentenceExcerpt = getContextSentence(para);
                    
                    // Determine contextual cross-reference anchor to place below this specific sentence
                    let contextualAnchor: { targetId: string; label: string; desc: string } | null = null;
                    if (section.id === 'overview') {
                      if (pIdx === 0) {
                        contextualAnchor = {
                          targetId: 'specifications',
                          label: 'View Engineering Clearances & Factory Specifications',
                          desc: 'Cross-reference cold tolerances and mechanical invariants',
                        };
                      } else if (pIdx === 1) {
                        contextualAnchor = {
                          targetId: 'mechanical-process',
                          label: 'Explore Step-by-Step Restoration & Tuning Process',
                          desc: 'Read the hands-on calibration procedure and linkage setup',
                        };
                      }
                    } else if (section.id === 'specifications') {
                      contextualAnchor = {
                        targetId: 'troubleshooting-qa',
                        label: 'Jump to Diagnostic Q&A for Cold Clearance Anomalies',
                        desc: 'Practical solutions to thermal expansion and valve lash drift',
                      };
                    } else if (section.id === 'mechanical-process') {
                      if (pIdx === 0) {
                        contextualAnchor = {
                          targetId: 'troubleshooting-qa',
                          label: 'Troubleshoot Linkage & Carburetor Synchronization Issues',
                          desc: 'Field diagnoses for vacuum leaks and erratic idle speed',
                        };
                      }
                    } else if (section.id === 'troubleshooting-qa') {
                      contextualAnchor = {
                        targetId: 'archival-verdict',
                        label: 'Read Curator Verdict & Road Assessment',
                        desc: 'Summary of dynamic road character and long-term preservation',
                      };
                    }

                    return (
                      <div key={pIdx} className="space-y-3">
                        <p
                          className={
                            idx === 0 && pIdx === 0
                              ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#143D2B]'
                              : ''
                          }
                        >
                          {para}
                        </p>

                        {/* Contextual Anchor Link placed directly below this specific sentence */}
                        {contextualAnchor && (
                          <div className="my-3 p-3 bg-[#FAF8F3] border border-[#E7E2D8] hover:border-[#143D2B]/50 rounded-md transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div className="flex items-start sm:items-center gap-2 text-[#44403C]">
                              <Link2 className="w-3.5 h-3.5 text-[#143D2B] shrink-0 mt-0.5 sm:mt-0" />
                              <div>
                                <span className="text-[#78716C] block sm:inline">Reference for Sentence: </span>
                                <span className="font-serif italic text-[#1C1917]">"{sentenceExcerpt}"</span>
                              </div>
                            </div>
                            <a
                              href={`#${contextualAnchor.targetId}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigateSection(contextualAnchor!.targetId);
                              }}
                              className="inline-flex items-center gap-1 font-semibold text-[#143D2B] hover:underline shrink-0 bg-[#FBF9F5] px-2.5 py-1 rounded border border-[#E7E2D8]"
                            >
                              <span>{contextualAnchor.label}</span>
                              <ArrowDownRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Specifications Grid if present */}
                {section.id === 'specifications' && article.specs.length > 0 && (
                  <div className="mt-8 bg-[#F4F1EA] border border-[#E7E2D8] rounded-lg p-5">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D8] mb-3">
                      <h4 className="font-serif font-bold text-sm text-[#1C1917]">
                        Archival Engineering Invariants & Clearances
                      </h4>
                      <a
                        href="#troubleshooting-qa"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigateSection('troubleshooting-qa');
                        }}
                        className="text-xs text-[#143D2B] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Diagnostic Q&A</span>
                        <ArrowDownRight className="w-3 h-3" />
                      </a>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                      {article.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex justify-between py-1 border-b border-[#E7E2D8]/60">
                          <dt className="text-[#78716C]">{spec.label}</dt>
                          <dd className="font-mono font-medium text-[#1C1917] text-right">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Bullet Points if present */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-5 space-y-2 text-sm text-[#44403C]">
                    {section.bulletPoints.map((point, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#143D2B] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraphs in Question-and-Answer format with deep anchor links */}
                {section.qaList && section.qaList.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#143D2B] uppercase tracking-wider pb-2 border-b border-[#E7E2D8]">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        <span>Procedural Question & Answer Format ({section.qaList.length} Items)</span>
                      </div>
                      <span className="font-mono text-[#78716C] lowercase text-[11px]">
                        individual anchor indexed
                      </span>
                    </div>

                    <div className="space-y-4 pt-2">
                      {section.qaList.map((qa, qaIdx) => {
                        const qaAnchorId = `qa-${section.id}-${qaIdx + 1}`;
                        return (
                          <div
                            key={qaIdx}
                            id={qaAnchorId}
                            className="scroll-mt-28 bg-[#F4F1EA] border border-[#E7E2D8] rounded-lg p-5 text-sm"
                          >
                            {/* Deep Anchor Bar directly below Question Title */}
                            <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-2 pb-1.5 border-b border-[#E7E2D8]/70">
                              <span className="font-mono font-bold text-[#143D2B]">
                                PROCEDURAL ANCHOR #{qaIdx + 1}
                              </span>
                              <a
                                href={`#${qaAnchorId}`}
                                onClick={(e) => handleCopyAnchor(qaAnchorId, e)}
                                className="inline-flex items-center gap-1 text-[#143D2B] hover:underline font-medium cursor-pointer"
                              >
                                {copiedAnchor === qaAnchorId ? (
                                  <>
                                    <Check className="w-3 h-3 text-[#143D2B]" />
                                    <span>Anchor Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Link2 className="w-3 h-3" />
                                    <span>Anchor Link to Question</span>
                                  </>
                                )}
                              </a>
                            </div>

                            <h4 className="font-serif font-bold text-base text-[#1C1917] mb-2 flex items-start gap-2">
                              <span className="font-mono text-[#143D2B] text-xs pt-1">Q:</span>
                              <span>{qa.question}</span>
                            </h4>

                            <div className="text-[#44403C] leading-relaxed pl-5 space-y-2">
                              <p>
                                <strong className="text-[#143D2B]">A: </strong>
                                {qa.answer}
                              </p>
                              {qa.proceduralTip && (
                                <div className="mt-2.5 pt-2 border-t border-[#E7E2D8] text-xs text-[#78716C] italic flex items-start gap-2">
                                  <span className="font-semibold text-[#143D2B] not-italic">Workshop Tip:</span>
                                  <span>{qa.proceduralTip}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Author Profile Component with Specialized Expertise */}
            <AuthorProfile author={article.author} />
          </div>

          {/* Sticky Sidebar with In-Article Table of Contents & Anchors (Col 9-12) */}
          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <TableOfContents
              sections={article.sections}
              activeSectionId={activeSectionId}
              onNavigateSection={handleNavigateSection}
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(article.id)}
              readTime={article.readTime}
              wordCount={article.wordCount}
            />
          </div>

        </div>

        {/* Related Articles Strip */}
        <section className="mt-20 pt-12 border-t border-[#E7E2D8]" aria-label="Related Articles">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              Related Technical Monographs
            </h3>
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-[#143D2B] hover:underline cursor-pointer"
            >
              Browse Complete Catalog (10) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.slug)}
                className="group cursor-pointer bg-[#F4F1EA] border border-[#E7E2D8] hover:border-[#143D2B] rounded-lg p-4 transition-all"
              >
                <div className="aspect-[16/9] rounded overflow-hidden bg-[#EBE6DF] mb-3">
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-[11px] text-[#78716C] mb-1">
                  <span>{rel.categoryLabel}</span> · <span>{rel.year}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#143D2B] line-clamp-2 transition-colors mb-2">
                  {rel.shortTitle}
                </h4>
                <p className="text-xs text-[#44403C] line-clamp-2 leading-relaxed">
                  {rel.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
