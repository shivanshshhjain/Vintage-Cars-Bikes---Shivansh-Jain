# The Classic Throttle – Vintage Automotive & Motorcycle Journal

An authentic, heritage-styled digital editorial journal featuring 10 in-depth articles on legendary vintage sports cars and classic motorcycles. Built with distinct shareable URLs, anchor links with a floating Table of Contents in every article, structured Q&A diagnostic and procedural sections, fast-loading optimized visual assets with complete descriptive alt text, and interactive search, category filtering, and bookmarking.

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the key editorial, visual, and architectural preferences in Phase 1:
> - **Article Balance**: Car focused with 7 classic cars and 3 vintage motorcycles.
> - **Aesthetic Identity**: Heritage classic with warm parchment/cream background, British racing green primary accents, and refined editorial serif typography.
> - **Interactive Capabilities**: Full category filtering, instant full-text search, reading time calculation, and local reading list bookmarking.
> - **Routing Architecture**: Clean path-based and history-aware URL navigation ensuring every article has its own unique, shareable address and updates the document title to adhere to strict 30–60 character SEO rules.

---

## 1. Overview & Core Concept

**The Classic Throttle** is a digital publication dedicated to vintage vehicle mechanics, coachwork restoration, and tuning history. Each of the 10 articles provides genuine technical precision—from setting valve lash on a Corvette L88 to shimming Isolastic mounts on a Norton Commando.

### The 10 Curated Articles
1. **1961 Jaguar E-Type Series 1 3.8**: Engine Overhaul & Triple SU Carburetor Synchronization *(Car)*
2. **1964 Aston Martin DB5**: Superleggera Tubular Coachwork & Aluminum Skin Preservation *(Car)*
3. **1973 Porsche 911 Carrera RS 2.7**: Bosch Mechanical Fuel Injection (MFI) Calibration *(Car)*
4. **1967 Alfa Romeo Giulia Sprint GTA**: Twin-Cam Valve Timing & Autodelta Suspension Tuning *(Car)*
5. **1955 Mercedes-Benz 300 SL "Gullwing"**: Direct Injection Pump Servicing & Spaceframe Overhaul *(Car)*
6. **1968 Chevrolet Corvette L88 427**: Solid-Lifter Lash Setting & Holley Double Pumper Setup *(Car)*
7. **1963 Ferrari 250 GT Berlinetta Lusso**: Colombo V12 Dual Marelli Distributor Synchronization *(Car)*
8. **1969 Triumph Bonneville T120**: Dual Amal Concentric Carburetor Balancing & Lucas Timing *(Motorcycle)*
9. **1974 Norton Commando 850**: Isolastic Frame Mount Shimming & Gearbox Alignment *(Motorcycle)*
10. **1972 Moto Guzzi V7 Sport**: Bevel-Gear Shaft Drive Backlash & Dell'Orto VHB Rebuild *(Motorcycle)*

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette (Heritage Classic)**:
  - Canvas: Archival warm cream (`#FBF9F5`) and warm limestone (`#F4F1EA`)
  - Primary Accent: British Racing Green (`#143D2B` and `#1B5238`)
  - Text & Inks: Vintage charcoal ink (`#1C1917`), antique muted slate (`#44403C`)
  - Fine Accents: Polished brass/bronze (`#996515` and `#845310`), hairline dividers (`#E7E2D8`)
- **Typography & Scale**:
  - Headings & Titles: High-contrast classic serif (`Playfair Display`, `Georgia`, or `Source Serif 4`)
  - Body Prose: Clear editorial measure (65–75 characters per line, `leading-relaxed`, `max-w-3xl`)
  - Metadata: Subdued uppercase letterspaced tracking (`text-xs tracking-wider font-sans text-stone-500`)
- **In-Article Anchors & Navigation**:
  - Sticky or floating Table of Contents for every article linking to `#overview`, `#specifications`, `#mechanical-process`, `#troubleshooting-qa`, and `#archival-verdict`.
  - Active scrollspy indicating current reading section.
  - Smooth native scrolling with back-to-top quick jump and shareable anchor URLs (e.g., `/article/jaguar-e-type-rebuild#troubleshooting-qa`).
- **Q&A Process Sections**:
  - Every article features an explicit Question & Answer diagnostic or troubleshooting section formatted with question headings (`<h3>`), direct expert answers, and step-by-step procedural tips.
- **Image Optimization & Accessibility**:
  - Clean photographic imagery optimized under 100 KB with explicit `width`, `height`, `alt`, and `loading="lazy"` attributes.
  - Styled heritage fallback container with SVG emblem and model metadata to satisfy the zero-broken-image mandate.

---

## 3. Key Product Decisions & Trade-Offs

- **URL Handling & Title Rules**:
  - *Decision*: Client-side clean URL routing supporting both direct paths (`/article/:slug`) and deep-anchor hashes (`#troubleshooting-qa`) using the HTML5 History API.
  - *Why*: Allows true distinct URL links as requested, bookmarking, and link sharing without server reload.
  - *Title Rules*: Each page dynamically updates `document.title` following standard SEO practice (`<Article Title> | The Classic Throttle`, 45–55 characters) and updates `<meta name="description">`.
- **Search & Filter Architecture**:
  - Client-side pre-indexed search across title, vehicle model, engine specs, and article body text.
  - Category tabs: *All (10)*, *Classic Automobiles (7)*, *Vintage Motorcycles (3)*, and *Saved Reading List*.
- **Local Persistence**:
  - LocalStorage stores bookmarked articles for persistent offline reading state across browser refreshes.

---

## 4. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                          The Classic Throttle                          │
├────────────────────────────────────────────────────────────────────────┤
│ Header: Wordmark · Nav (Articles, Automobiles, Motorcycles, Saved) ·   │
│         Search Trigger · Bookmarks Counter                             │
├────────────────────────────────────────────────────────────────────────┤
│ Router & State Management (Current Slug, Search Query, Category, Saved)│
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [Catalog View] (Root /)              [Article Detail View] (/article) │
│  ┌───────────────────────────────┐    ┌──────────────────────────────┐ │
│  │ Hero Curatorial Feature       │    │ Breadcrumbs & Reading Meta   │ │
│  │ Filter Bar & Search Input     │    │ Dynamic <title> & SEO Tags   │ │
│  │ 3-Tier Grid Layout:           │    │ Hero Header & Lead Image     │ │
│  │ - Primary Feature Card        │    │ Sticky Table of Contents     │ │
│  │ - Secondary Feature Cards     │    │ Anchor Sections:             │ │
│  │ - Department Archive List     │    │   1. #overview               │ │
│  │ Bookmarks Drawer              │    │   2. #specifications         │ │
│  └───────────────────────────────┘    │   3. #mechanical-process     │ │
│                                       │   4. #troubleshooting-qa     │ │
│                                       │   5. #archival-verdict       │ │
│                                       │ Share & Save Bar             │ │
│                                       │ Related Articles Strip       │ │
│                                       └──────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ Footer: Curatorial Credits · Issue Archive · Vintage Spec Invariants   │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown
1. **`App.tsx`**: Top-level router, state orchestrator (routing, bookmarks, search modal), and SEO document title listener.
2. **`components/Navbar.tsx`**: Complies with the 3-zone top bar contract (Brand wordmark, single-line navigation links, search & bookmark count trigger).
3. **`components/ArticleCard.tsx`**: Card with unboxed metadata (`·` separator), optimized image thumbnail, reading time, and bookmark button.
4. **`components/ArticleDetail.tsx`**: Comprehensive long-form article view with Table of Contents, anchor jump links, structured headings, Q&A process blocks, and vehicle spec callout box.
5. **`components/TableOfContents.tsx`**: Sticky anchor navigation with smooth scroll behavior.
6. **`components/SearchModal.tsx`**: Keyboard-accessible instant search overlay.
7. **`data/articles.ts`**: Factual, rich repository containing all 10 articles with full text, headings, Q&A sections, vehicle specs, and optimized lightweight images.
8. **`index.html` & `metadata.json`**: Updated brand titles, meta tags, and OpenGraph descriptors.
