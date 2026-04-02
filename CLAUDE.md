# HealthNook Theme — Master Implementation Guide

> **DOCUMENTATION ONLY.** This file contains no executable code. It is the single source of truth for building the HealthNook Shopify theme section by section. All future implementation decisions should be grounded here.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Shopify Dawn Theme Context](#2-shopify-dawn-theme-context)
3. [File Naming Convention](#3-file-naming-convention)
4. [Visual Style Summary](#4-visual-style-summary)
5. [Homepage Section Order](#5-homepage-section-order)
6. [Theme Color Schema Rules](#6-theme-color-schema-rules)
7. [Typography System](#7-typography-system)
8. [Global CSS / Utility Class Strategy](#8-global-css--utility-class-strategy)
9. [Shared Component Patterns](#9-shared-component-patterns)
10. [Homepage Section-by-Section Documentation](#10-homepage-section-by-section-documentation)
11. [Theme Editor / Future Configurability Notes](#11-theme-editor--future-configurability-notes)
12. [Development Rules for Future Section Builds](#12-development-rules-for-future-section-builds)
13. [Notes / Assumptions / Unknowns](#13-notes--assumptions--unknowns)

---

## 1. Project Overview

**Project:** HealthNook — Premium Wellness & Supplements Ecommerce Store
**Platform:** Shopify
**Base Theme:** Dawn (official Shopify starter theme)
**Implementation Style:** Custom extension of Dawn — modular, maintainable, brand-led

### Purpose of This File

This `CLAUDE.md` is the master implementation reference for the HealthNook theme. It documents:

- The full design system (colors, typography, spacing, components)
- The homepage layout and section-by-section build specification
- Naming conventions, file structure rules, and architectural decisions
- Future-proof rules for generating each section consistently

**Homepage sections will be built one at a time in future sessions.** This file removes the need to re-explain the design system each time. Before generating any section, refer to this file for color values, typography specs, naming rules, and component patterns.

This file is documentation only. No Liquid, CSS, JavaScript, or Shopify schema has been generated yet.

---

## 2. Shopify Dawn Theme Context

The store uses the **Shopify Dawn theme** as the foundational base. Dawn is Shopify's official reference theme — it is performant, semantically structured, and natively integrated with the Shopify theme editor (Online Store 2.0).

### Development Philosophy

- **Extend, don't fight Dawn.** Custom sections should integrate naturally with Dawn's architecture rather than replacing or overriding its core systems unnecessarily.
- **Respect Dawn's conventions.** Follow Dawn's existing patterns for section structure, schema definitions, Liquid includes, and CSS organization where applicable.
- **Keep code modular.** Each custom section should be self-contained where possible, with shared logic extracted into reusable snippets or the global stylesheet.
- **Preserve the editor experience.** Custom sections must integrate cleanly with Shopify's theme editor so that store managers can configure content without developer involvement.
- **Avoid touching Dawn core files** unless explicitly instructed. If a Dawn core behavior must be overridden, document the reason clearly.

### Mindful Implementation Areas

| Area | Guidance |
|---|---|
| Section architecture | Follow Dawn's `sections/` pattern — settings in schema, content in Liquid |
| Responsive behavior | Align with Dawn's responsive conventions and breakpoints |
| Utility patterns | Reuse Dawn CSS utilities where they already provide the needed behavior |
| Semantic HTML | Use appropriate heading hierarchy, landmark elements, and accessible markup |
| Performance | Avoid blocking scripts; prefer native Shopify lazy-load patterns |
| Theme editor | Every user-facing value should be configurable via schema settings |

---

## 3. File Naming Convention

> **This is a permanent, non-negotiable project rule.**

All custom theme files created for this project must use the `jci-` prefix. This applies to every custom section, snippet, block, and reusable partial.

### Rule

```
All custom files = jci-*.liquid
```

### Examples

| Type | File Name |
|---|---|
| Section | `sections/jci-hero-banner.liquid` |
| Section | `sections/jci-shop-by-brand.liquid` |
| Section | `sections/jci-trending-picks.liquid` |
| Section | `sections/jci-navigate-by-features.liquid` |
| Section | `sections/jci-healthy-articles.liquid` |
| Section | `sections/jci-shop-by-category.liquid` |
| Section | `sections/jci-just-landed.liquid` |
| Section | `sections/jci-testimonials.liquid` |
| Section | `sections/jci-subscribe-band.liquid` |
| Snippet | `snippets/jci-product-card.liquid` |
| Snippet | `snippets/jci-section-heading.liquid` |
| Snippet | `snippets/jci-promo-card.liquid` |
| Snippet | `snippets/jci-article-card.liquid` |
| Snippet | `snippets/jci-brand-card.liquid` |
| Snippet | `snippets/jci-testimonial-card.liquid` |
| Global CSS | `assets/jci-style.css` |

### Rules Summary

- Every newly generated custom section → `sections/jci-*.liquid`
- Every reusable custom snippet → `snippets/jci-*.liquid`
- Any block-like reusable partial → must follow the `jci-*` naming direction
- Avoid generic, non-prefixed names for custom files (e.g., do not use `hero.liquid` or `card.liquid`)
- Dawn core files (e.g., `sections/main-product.liquid`, `snippets/card-product.liquid`) must not be renamed

---

## 4. Visual Style Summary

HealthNook is a premium wellness and supplements ecommerce destination. The visual design communicates trust, naturalness, and modern quality.

### Design Language

- **Clean and modern** — minimal clutter, generous whitespace, structured layouts
- **Brand-led** — dark green (`#213F22`) anchors the identity across the homepage
- **Soft and natural** — light green (`#EBF7E1`) and soft off-white (`#F5F8F7`) provide warmth without sterility
- **Modular and rounded** — cards use soft border radii; sections feel like distinct, polished modules
- **Conversion-focused** — CTAs are prominent, clear, and consistent in hierarchy
- **Editorial balance** — product-led but supported by article and brand discovery content

### Tone

| Attribute | Expression |
|---|---|
| Premium | Refined spacing, confident typography, no visual noise |
| Calm | Soft greens, light neutrals, unhurried layout rhythm |
| Natural | Color palette references nature; wellness context |
| Modern | Clean sans-serif type, modular grid, clear hierarchy |
| Conversion-focused | Strong CTAs, product prominence, trust signals |

### Visual Consistency Rule

All sections — regardless of which session they are generated in — must maintain this unified visual language. No section should feel visually disconnected from the rest of the homepage.

---

## 5. Homepage Section Order

The homepage follows this exact section order as documented in the design PDF. Future section builds must respect this sequence unless a later brief explicitly changes it.

| # | Section | File (planned) |
|---|---|---|
| 1 | Header / Top Navigation | Dawn header (customized) |
| 2 | Hero — Two-Column Banner + Right Promo Stack | `jci-hero-banner.liquid` |
| 3 | Shop By Brand | `jci-shop-by-brand.liquid` |
| 4 | HealthNook Trending Picks | `jci-trending-picks.liquid` |
| 5 | Navigate By Product Features | `jci-navigate-by-features.liquid` |
| 6 | Healthy Articles | `jci-healthy-articles.liquid` |
| 7 | Shop By Category | `jci-shop-by-category.liquid` |
| 8 | Just Landed | `jci-just-landed.liquid` |
| 9 | Trusted By 100's Of Customers | `jci-testimonials.liquid` |
| 10 | Subscribe for Healthy Deals & News | `jci-subscribe-band.liquid` |
| 11 | Footer Upper Content Area | Dawn footer (customized) |
| 12 | Footer Lower Branding / Legal | Dawn footer (customized) |

---

## 6. Theme Color Schema Rules

The following color values must be applied consistently across all sections. This section is split into two parts:

1. **Native Dawn Color Schemes** — registered in `config/settings_data.json`, selectable in the theme editor
2. **Section-Level-Only Colors** — applied via inline styles in Liquid section files; not forced into `settings_schema.json`

---

### Native Dawn Color Schemes (settings_data.json)

All 9 schemes are registered in both `current` and `presets.Dawn.color_schemes`.

#### scheme-1 — Dark Green Primary
| Field | Value |
|---|---|
| background | `#213F22` |
| text | `#F5F8F7` |
| button | `#F5F8F7` |
| button_label | `#213F22` |
| secondary_button_label | `#F5F8F7` |
| shadow | `#213F22` |

**Usage:** Hero banner left panel, subscribe band, footer band, any primary dark green section.

---

#### scheme-2 — Light Green Surface
| Field | Value |
|---|---|
| background | `#EBF7E1` |
| text | `#213F22` |
| button | `#F5F8F7` |
| button_label | `#213F22` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Secondary light-surface sections, filter chip areas, soft content areas. Also used for footer upper area (`#EBF7E1`).

---

#### scheme-3 — Off-White with Card Emphasis
| Field | Value |
|---|---|
| background | `#F5F8F7` |
| text | `#213F22` |
| button | `#365533` |
| button_label | `#F5F8F7` |
| secondary_button_label | `#213F22` |
| shadow | `#255E62` |

**Usage:** Product card sections, card-heavy layouts. The `#365533` button and `#255E62` shadow capture the card emphasis palette.

---

#### scheme-4 — Light Green Interactive
| Field | Value |
|---|---|
| background | `#EBF7E1` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#F5F8F7` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Interactive sections — filter chips, navigation tiles, hover states (light green → dark green).

---

#### scheme-5 — Off-White Clean Surface
| Field | Value |
|---|---|
| background | `#F5F8F7` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#F5F8F7` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Clean neutral page areas, article sections, general off-white surfaces.

---

#### scheme-6 — Testimonial Pastel 1 (Lime)
| Field | Value |
|---|---|
| background | `#F5FFD9` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#F5FFD9` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** First testimonial card background. Applied per-card via inline style in `jci-testimonials.liquid`.

---

#### scheme-7 — Testimonial Pastel 2 (Sky Blue)
| Field | Value |
|---|---|
| background | `#D9FBFF` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#D9FBFF` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Second testimonial card background. Applied per-card via inline style in `jci-testimonials.liquid`.

---

#### scheme-8 — Testimonial Pastel 3 (Pink)
| Field | Value |
|---|---|
| background | `#FFE4D9` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#FFE4D9` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Third (last) testimonial card background — the pink pastel. Applied per-card via inline style in `jci-testimonials.liquid`.

---

#### scheme-10 — Pure White Surface
| Field | Value |
|---|---|
| background | `#FFFFFF` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#FFFFFF` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Pure white section backgrounds. Applied to `jci-home-hero.liquid` as the section wrapper background.

---

#### scheme-9 — Footer Secondary Green
| Field | Value |
|---|---|
| background | `#D8F3DC` |
| text | `#213F22` |
| button | `#213F22` |
| button_label | `#D8F3DC` |
| secondary_button_label | `#213F22` |
| shadow | `#213F22` |

**Usage:** Footer secondary surface. Pairs with scheme-2 (`#EBF7E1`) for a two-tone footer treatment.

---

### Section-Level-Only Colors

These colors cannot be expressed as Dawn color scheme fields (background, text, button, button_label, shadow). They must be applied via **inline styles or CSS custom properties** within individual section Liquid files. Do not add these to `settings_schema.json`.

| Color | Value | Where Used | Application |
|---|---|---|---|
| Hero badge background | `#BCE599` | Hero section badge ("CALM & BALANCE") | Inline `style` on badge element |
| Card border | `1.07px solid #255E62` | Product cards, testimonial cards | CSS in `jci-style.css` or section `<style>` |
| Small button border | `1px solid #213F22` | Outline/secondary buttons | CSS class in `jci-style.css` |
| Stars / card button fill | `#365533` | Star ratings, product card buttons | CSS in `jci-style.css` (already in scheme-3 button field for reference) |

---

### Footer Color Reference

| Surface | Value | Source |
|---|---|---|
| Footer upper background option 1 | `#EBF7E1` | scheme-2 |
| Footer upper background option 2 | `#D8F3DC` | scheme-9 |
| Footer lower background | `#213F22` | scheme-1 |

---

### Schema-to-Section Mapping

| Section | Dawn Scheme | Notes |
|---|---|---|
| Hero banner (left panel) | scheme-1 | Dark green surface |
| Hero promo cards (right stack) | scheme-2 | Light green surface |
| Shop By Brand | scheme-2 / scheme-4 | Light green, interactive chips |
| Trending Picks | scheme-3 | Off-white with card emphasis |
| Navigate By Features | scheme-4 | Light green interactive |
| Healthy Articles | scheme-5 | Clean off-white editorial |
| Shop By Category | scheme-1 | Dark green section |
| Just Landed | scheme-3 | Same product card logic |
| Testimonials (card 1) | scheme-6 | `#F5FFD9` per-card inline |
| Testimonials (card 2) | scheme-7 | `#D9FBFF` per-card inline |
| Testimonials (card 3) | scheme-8 | `#FFE4D9` per-card inline |
| Subscribe Band | scheme-1 | Dark green band |
| Footer upper | scheme-2 / scheme-9 | `#EBF7E1` or `#D8F3DC` |
| Footer lower | scheme-1 | Dark green brand strip |

---

## 7. Typography System

The HealthNook theme uses the **Alexandria** typeface for the entire site — headings and body copy.

### Font Installation

Alexandria is installed via Shopify's native font system. Both `type_header_font` and `type_body_font` in `config/settings_data.json` are set to `alexandria_n4` (Shopify's identifier for Alexandria Regular, weight 400).

Dawn automatically handles:
- Generating `@font-face` rules via `{{ settings.type_header_font | font_face }}`
- Serving the font from `fonts.shopifycdn.com`
- Preloading via `<link rel="preload">` in `<head>`
- Exposing the font as CSS custom properties `--font-heading-family` and `--font-body-family`

**No manual `@font-face` or Google Fonts `<link>` tag is needed.** Do not add a separate font loader in `theme.liquid` or `jci-style.css`.

All type specifications below are the exact source of truth.

### Type Scale

| Name | Size | Weight | Notes |
|---|---|---|---|
| Heading XL | `40px` | `400` | Primary hero headings |
| Heading LG | `30px` | `500` | Section headings |

### Hero-Specific Typography

| Element | Font | Size | Weight | Line-Height | Transform |
|---|---|---|---|---|---|
| Hero Heading | Alexandria | `40px` | `400` | `39px` | `uppercase` |
| Hero Description | Alexandria | `16px` | `300` | `20px` | none |
| Hero Button Text | Alexandria | `16px` | `500` | — | `uppercase` |

### Utility Class Names (to be implemented later)

When the global stylesheet (`assets/jci-style.css`) is created, the following utility class names must be defined:

- `.heading-xl` — maps to 40px / weight 400
- `.heading-lg` — maps to 30px / weight 500

### Rules

- Typography utilities must be **global**, not scoped to individual sections
- Do not re-declare font sizes inside individual section stylesheets when a utility already covers the pattern
- Future body copy, badge text, button text, pricing, metadata, labels, and small navigation text should each have a defined utility class that follows the same naming convention
- No CSS has been generated yet — this section documents the intended system only

---

## 8. Global CSS / Utility Class Strategy

### Global Stylesheet Location

```
assets/jci-style.css
```

This single file is the shared stylesheet for all custom theme code. It must be loaded globally (e.g., via `layout/theme.liquid` or Dawn's asset include system).

### What Goes in `jci-style.css`

The following categories of styles belong in the global stylesheet — not inside individual section files:

| Category | Examples |
|---|---|
| Typography utilities | `.heading-xl`, `.heading-lg`, `.body-sm`, `.label-text` |
| Shared button styles | `.jci-btn`, `.jci-btn--primary`, `.jci-btn--outline`, `.jci-btn--pill` |
| Shared badge styles | `.jci-badge`, `.jci-badge--sale`, `.jci-badge--hero` |
| Card treatments | `.jci-card`, `.jci-card--product`, `.jci-card--article` |
| Border radius tokens | Consistent `border-radius` values used across components |
| Section spacing | Consistent vertical padding/margin for section rhythm |
| Container / max-width | `.jci-container` with max-width and centering behavior |
| Repeatable layout utilities | Flex/grid helpers used in more than one section |

### What Goes in Section Files

Only styles that are **unique to that section** — layout specifics, section-level overrides, or section-scoped component variations that do not repeat elsewhere.

### Rule

> When a visual pattern appears in more than one section, it belongs in `jci-style.css` — not duplicated across multiple `<style>` blocks.

### Naming Pattern Example

`.heading-xl` is the reference naming pattern. All utility classes should:
- be lowercase with hyphens
- use the `jci-` prefix only where scoped to custom components (not pure utility classes like `.heading-xl`)
- be named for their **function**, not their visual appearance (prefer `.jci-card--product` over `.jci-card--green`)

---

## 9. Shared Component Patterns

The following component types recur across multiple homepage sections. When sections are built, these shared components should be extracted into reusable snippets under `snippets/jci-*.liquid` wherever possible.

---

### Buttons

| Type | Description |
|---|---|
| Large CTA Button | Full-width or wide button, off-white background, dark green text, rounded 6px |
| Pill / Filter Button | Compact chip shape, used in alpha filters and tag navigation |
| Add-to-Cart Button | Product card action — must integrate with Shopify cart behavior |
| Text-Link CTA | Inline links: "Explore", "Read Article", "View All" — lighter visual weight |

---

### Cards

| Type | Description |
|---|---|
| Promo Card | Hero right-stack cards — "Explore Brands", "Find by Category" |
| Product Card | Repeating card used in Trending Picks and Just Landed |
| Category Card | Icon + text tiles in Shop By Category |
| Article Card | Editorial cards in Healthy Articles — small and large variants |
| Testimonial Card | Review cards with pastel backgrounds |
| Brand Card | Logo-forward card in Shop By Brand |

---

### Filters / Chips

| Type | Description |
|---|---|
| Alpha Filter Chips | Used in Shop By Brand — letter-based filter pills (A–Z) |
| Pill Navigation | Lightweight navigation used in product/category sections |

Hover state: light green (`#EBF7E1`) → dark green (`#213F22`) background swap.

---

### Badges

| Type | Description |
|---|---|
| Hero Badge | "CALM & BALANCE" — 151×32px, `#BCE599` background, 6px radius |
| Sale Badge | Over product image — 85×26px, 6px radius, 12px text |
| Content Label | Category label or editorial tag on article cards |

---

### Product Card Pattern

This structure repeats in both Trending Picks and Just Landed sections. It must be extracted into a single reusable snippet: `snippets/jci-product-card.liquid`.

Structure (top to bottom):
1. Product image
2. Rating row (stars)
3. Product title
4. Price / compare-at price
5. Add-to-cart button

Card border: `1.07px solid #255E62`
Star / button background: `#365533`

---

### Section Heading Pattern

Multiple sections open with a consistent heading treatment. This should be extracted into `snippets/jci-section-heading.liquid` and reused. The pattern typically includes:

- A section eyebrow label or badge (optional)
- A primary heading (`heading-lg` or `heading-xl`)
- An optional subheading or description line
- An optional right-aligned "View All" link

---

## 10. Homepage Section-by-Section Documentation

---

### Section 1 — Header / Top Navigation

**Purpose:** Primary site navigation and utility bar.

**Layout:**
- Slim, single-row navigation bar
- Left side: navigation links (product categories, brand discovery, etc.)
- Center or right: search input or search icon trigger
- Right side: utility icons — account, wishlist (optional), cart with item count

**Styling Direction:**
- Clean and uncluttered
- Background should integrate with the brand palette (likely off-white or white)
- No heavy shadow or heavy border — keep it lightweight
- Active/hover states should reference dark green (`#213F22`)

**Implementation Notes:**
- Use Dawn's existing header section as the base
- Customize via Dawn's header schema settings where possible before building a custom replacement
- If a fully custom header is required later, it will be named `sections/jci-header.liquid`

---

### Section 2 — Hero Banner

**Purpose:** Primary above-the-fold section combining the main hero with supporting promotional entry points.

**Overall Composition:**
This is a composed multi-block hero system — not a single banner. It consists of:
1. A two-column hero banner (left content + right image)
2. A right-side vertical stack of smaller promo cards

**Hero Banner Specs:**
- Total size: `806px × 500px`

**Left Content Panel:**
- Size: `428px × 500px`
- Background: `#213F22` (dark green)
- Rounded corners: left side `10px` radius

**Right Image Panel:**
- Size: `378px × 500px`
- Rounded corners: right side `10px` radius
- Contains a product/lifestyle image
- Has a sale badge overlaid on the image

**Top-Left Badge:**
- Text: `CALM & BALANCE`
- Size: `151px × 32px`
- Background: `#BCE599`
- Border radius: `6px`
- Positioned top-left of the left panel

**Hero Heading:**
- Font: Alexandria
- Size: `40px` / Weight: `400`
- Line-height: `39px`
- Transform: `uppercase`
- Color: light (on dark green background)

**Hero Description:**
- Font: Alexandria
- Size: `16px` / Weight: `300`
- Line-height: `20px`

**CTA Button:**
- Size: `372px × 50px`
- Background: `#F5F8F7`
- Border radius: `6px`
- Text: Alexandria, `16px`, weight `500`, `uppercase`, color `#213F22`

**Sale Badge (over image):**
- Size: `85px × 26px`
- Border radius: `6px`
- Font size: `12px`

**Right-Side Promo Stack:**
- Positioned to the right of the hero banner
- A small intro block — HealthNook savings / value proposition summary
- Two stacked promo cards:
  - "Explore Brands" — links to brand discovery
  - "Find by Category" — links to category browsing
- These promo cards are compact, rounded, and use the secondary color palette

**Configurable Content (future schema):**
- Hero heading text
- Hero description text
- CTA button label + link
- Hero image
- Badge label text
- Sale badge text
- Promo card headings, descriptions, and links

---

### Section 3 — Shop By Brand

**Purpose:** Brand discovery section with filterable brand logo cards.

**Layout:**
- Section heading
- Alpha filter chip row (A–Z letter pills for filtering brands by first letter)
- Grid of brand logo cards — clean, logo-forward, minimal text
- Centered "View All" CTA at the bottom

**Styling Direction:**
- Light surface background (Schema #2 / #4)
- Filter chips: light green background, dark green text, hover inverts to dark green background
- Brand cards: clean white or off-white, soft border, logo centered
- Spacing: consistent card gaps, row-based alignment

**Reusable Patterns:**
- Alpha filter chips → reusable pill component
- Brand cards → `snippets/jci-brand-card.liquid`
- Section heading → `snippets/jci-section-heading.liquid`

**Notes:**
- Alpha filtering may require JavaScript interaction — document behavior clearly when implementing
- Consider whether filtering is static (Liquid-rendered per letter) or dynamic (JS-filtered on client side)

---

### Section 4 — HealthNook Trending Picks

**Purpose:** Product showcase driving discovery of trending products.

**Layout:**
- Section heading with optional "View All" link
- Row or slider of product cards
- Each card follows the shared product card pattern

**Styling Direction:**
- Product cards: `1.07px solid #255E62` border, `#365533` star/button background
- Background: likely light surface or white

**Reusable Patterns:**
- Product cards → `snippets/jci-product-card.liquid` (shared with Just Landed)
- Section heading → `snippets/jci-section-heading.liquid`

**Behavior Notes:**
- May render as a scrollable slider on mobile and a fixed grid on desktop
- Product data sourced from a configurable collection in schema

---

### Section 5 — Navigate By Product Features

**Purpose:** Allow customers to browse products by health benefits, certifications, or product attributes.

**Layout:**
- Grid of icon + text tiles
- Each tile represents a product feature, benefit, or certification (e.g., "Vegan", "Gluten-Free", "Non-GMO")
- Some tiles may use alternating visual emphasis (e.g., darker background for selected/featured attribute)

**Styling Direction:**
- Clean, readable tiles
- Icon above or beside label text
- Hover state likely uses dark green (`#213F22`) emphasis
- Consistent grid spacing

**Reusable Patterns:**
- Section heading → `snippets/jci-section-heading.liquid`
- Feature tiles likely templated via block schema (each block = one attribute)

---

### Section 6 — Healthy Articles

**Purpose:** Editorial content section supporting brand authority and wellness education.

**Layout:**
- Left side: stacked smaller article cards (2–3 compact cards)
- Right side: one larger featured article card with a bigger image
- Asymmetric two-column layout

**Card Structure:**
- Article image
- Category label / badge
- Article heading
- Short excerpt or date
- "Read Article" text-link CTA

**Styling Direction:**
- Clean editorial feel — premium and readable
- Light background surface
- Article card images are prominent
- Cards should feel distinct from product cards

**Reusable Patterns:**
- Article cards → `snippets/jci-article-card.liquid`
- Section heading → `snippets/jci-section-heading.liquid`

**Notes:**
- Article content sourced from Shopify Blog
- Featured article likely controlled via a schema setting pointing to a specific article handle

---

### Section 7 — Shop By Category

**Purpose:** Category navigation grid for retail browsing.

**Layout:**
- Grid of category cards
- Each card: icon or image + category label text
- One card in the set uses a darker emphasis treatment (likely `#213F22` dark green background)
- Soft, rounded card style

**Styling Direction:**
- Section background: `#213F22` (Color Schema #6)
- Category card backgrounds: `#EBF7E1` (light green), with one emphasis card darker
- Consistent icon size and label positioning

**Reusable Patterns:**
- Category cards → reusable block structure in section schema
- Section heading → `snippets/jci-section-heading.liquid`

---

### Section 8 — Just Landed

**Purpose:** New arrivals product showcase.

**Layout:**
- Same layout and structure as Trending Picks (Section 4)
- Section heading with optional "View All" link
- Row or slider of product cards

**Styling Direction:**
- Follows same product card system as Trending Picks
- May use a slightly different section background to differentiate visually

**Reusable Patterns:**
- Product cards → `snippets/jci-product-card.liquid` (same snippet as Trending Picks)
- Section heading → `snippets/jci-section-heading.liquid`

**Notes:**
- When generating this section, do not rebuild the product card — render `jci-product-card.liquid`
- The section schema should point to a "New Arrivals" collection

---

### Section 9 — Trusted By 100's Of Customers

**Purpose:** Social proof and trust-building section featuring customer testimonials.

**Layout:**
- Row of testimonial cards
- Each card: avatar, customer name, verified label, star rating, review body text
- Optional: small product image or product name reference within the card

**Card Structure (per testimonial):**
1. Avatar image
2. Customer name
3. Verified buyer label
4. Star rating (5-star row — color `#365533`)
5. Review text / body copy
6. Optional product reference

**Styling Direction:**
- Each card uses a distinct pastel background (Color Schema #8):
  - `#F5FFD9` (left)
  - `#D9FBFF` (middle)
  - `#FFE4D9` (right/last)
- Cards feel warm, approachable, and wellness-aligned
- Layout should feel readable and trustworthy — not dense

**Reusable Patterns:**
- Testimonial cards → `snippets/jci-testimonial-card.liquid`
- Section heading → `snippets/jci-section-heading.liquid`

---

### Section 10 — Subscribe for Healthy Deals & News

**Purpose:** Email capture / newsletter signup with opt-in support.

**Layout:**
- Full-width dark green band (`#213F22`)
- Left side: heading + supporting description text
- Right side: email form with input field and submit button
- Optional: compact consent / privacy note below the form

**Styling Direction:**
- Dark green background (Color Schema #9 / #1)
- Light text on dark background
- Form field: light/off-white styled input
- Submit button: `#F5F8F7` background, `#213F22` text

**Notes:**
- Form submission should integrate with Shopify's newsletter customer capture or a third-party ESP (document integration point when implementing)
- Opt-in consent text should be configurable via schema

---

### Section 11 — Footer Upper Content Area

**Purpose:** Informational and navigational footer block above the brand identity strip.

**Layout:**
- Multiple columns covering: navigation links, support/contact info, and newsletter teaser or brand copy
- May include contact details (email, phone)
- Possibly includes a secondary newsletter row

**Styling Direction:**
- Light branded background — consistent with off-white or light green palette
- Clean typographic columns
- No heavy visual treatment — this is functional and informational

**Implementation Notes:**
- Likely customized from Dawn's existing footer section
- If a fully custom footer is required, it will be named `sections/jci-footer-upper.liquid`

---

### Section 12 — Footer Lower Branding / Legal Area

**Purpose:** Brand identity, social proof, copyright, and legal links.

**Layout:**
- Large HealthNook branding / logo presence
- Social media icons (horizontal row)
- Copyright line and legal navigation links (Privacy Policy, Terms, etc.)
- Minimal, refined layout

**Styling Direction:**
- Follows same dark brand direction as the subscribe band
- Premium and minimal — no clutter
- Consistent with brand palette

---

## 11. Theme Editor / Future Configurability Notes

When sections are built, the following content areas must be made configurable via Shopify's theme editor schema. This list is the reference for what schema settings to include when each section is implemented.

| Section | Configurable Elements |
|---|---|
| Header | Navigation menu, logo, search behavior |
| Hero Banner | Heading, description, button text + link, hero image, badge label, sale badge text |
| Hero Promo Stack | Promo card headings, descriptions, links, images |
| Shop By Brand | Section heading, brand entries (logo, name, letter, link), View All link |
| Trending Picks | Section heading, linked collection, View All link, card count |
| Navigate By Features | Section heading, feature tiles (icon, label, link) |
| Healthy Articles | Section heading, blog source, featured article handle |
| Shop By Category | Section heading, category entries (image/icon, label, link) |
| Just Landed | Section heading, linked collection, View All link, card count |
| Testimonials | Section heading, testimonial entries (name, avatar, review, stars, product) |
| Subscribe Band | Heading, description text, button label, consent text |
| Footer Upper | Navigation menus, contact details, brand copy |
| Footer Lower | Logo, social links, copyright text, legal links |

No schema has been generated yet. This is documentation only.

---

## 12. Development Rules for Future Section Builds

These rules apply to every future section generation session. They are non-negotiable unless explicitly changed by a later brief.

### Naming

- Every new custom section file: `sections/jci-*.liquid`
- Every new custom snippet file: `snippets/jci-*.liquid`
- Every new custom asset: `assets/jci-*`
- Do not use generic names without the `jci-` prefix for custom files

### Dawn Compatibility

- Extend Dawn cleanly — do not overwrite or break Dawn's existing section/snippet architecture
- Custom sections should coexist peacefully with Dawn's core files in the Shopify theme editor
- If a Dawn utility or pattern already covers the need, use it rather than reinventing it

### CSS Strategy

- Shared styles → `assets/jci-style.css`
- Section-unique styles → inline `<style>` block or section-scoped `<style>` in the section file
- Do not duplicate shared utility styles across multiple section files
- Create shared utilities when a visual pattern repeats in two or more sections

### Components

- Extract repeating UI into named snippets (`jci-product-card.liquid`, `jci-section-heading.liquid`, etc.)
- Render snippets with `{% render %}` — do not use `{% include %}` (deprecated in Dawn)
- When generating a section that reuses a previously built snippet, render the existing snippet — do not rebuild it

### Design Fidelity

- Use exact hex color values from Section 6 — do not approximate or substitute
- Use exact typography values from Section 7 — do not adjust sizes or weights without explicit instruction
- Follow spacing and rhythm patterns documented in this file
- Maintain the premium wellness tone across every section

### Schema

- Every user-facing value in a section must be exposed as a theme editor setting
- Use sensible defaults so sections look correct out of the box in the theme editor
- Group related settings using `header` type dividers within schema for clarity

### Order of Work

Sections should be built in this recommended sequence (unless a specific section is prioritized):

1. `jci-style.css` — global utilities first
2. `jci-section-heading.liquid` — snippet, used everywhere
3. `jci-product-card.liquid` — snippet, used in sections 4 and 8
4. `jci-hero-banner.liquid`
5. `jci-shop-by-brand.liquid`
6. `jci-trending-picks.liquid`
7. `jci-navigate-by-features.liquid`
8. `jci-healthy-articles.liquid`
9. `jci-shop-by-category.liquid`
10. `jci-just-landed.liquid`
11. `jci-testimonials.liquid`
12. `jci-subscribe-band.liquid`
13. Footer customization

---

## 13. Notes / Assumptions / Unknowns

### Confirmed

- Base theme: Shopify Dawn
- File prefix: `jci-`
- Font: Alexandria (must be loaded globally — confirm via Shopify font picker or manual `@font-face`)
- Color values: confirmed from design notes (Section 6)
- Typography scale: confirmed from design notes (Section 7)
- Homepage section order: confirmed from design PDF

### Assumptions

- The Alexandria font is available via Shopify's font picker or will be loaded via `@font-face` in `jci-style.css`
- Alpha filtering in Shop By Brand will be JavaScript-driven (client-side filtering of rendered brand cards)
- Testimonial content will be managed via section blocks in the theme editor (not pulled from a reviews app — unless confirmed otherwise)
- Articles section pulls from a Shopify Blog — the specific blog handle will be confirmed during implementation
- The hero right-side promo stack is part of the hero section (same section file), not a separate section

### Unknowns / To Confirm

- Is there a third-party reviews app (e.g., Judge.me, Okendo) for testimonials, or is review content hardcoded via schema?
- Is there a third-party email marketing integration for the subscribe band (e.g., Klaviyo, Mailchimp), or does it use Shopify's native newsletter form?
- Does the Shop By Brand section pull brand data from a metaobject, a collection, or hardcoded schema blocks?
- Are there any product metafields used for features/certifications in the Navigate By Features section?
- Will the header be a fully custom file or will Dawn's header section be configured via settings?
- Are there any animation or scroll-behavior requirements not visible in the static PDF?

### Source of Truth Priority

When in doubt during implementation:
1. Explicit values in this file (colors, type sizes, weights) → **highest priority**
2. Design PDF layout and section composition → **second priority**
3. Dawn conventions and patterns → **third priority (for architecture decisions)**

---

## 14. Implemented Sections

### `sections/jci-home-hero.liquid` — Home Hero (Section 2)

**Status:** Built. File: `sections/jci-home-hero.liquid`

**Layout:**
- Desktop: CSS grid, 2fr (hero card) + 1fr (promo stack), gap 1.5rem
- Hero card: flex row — left content panel (53.5%) + right image panel (46.5%), `border-radius: 10px`, `overflow: hidden`
- Right column: flex column — promo text block + 2 promo cards (flex: 1 each)
- Mobile: single column; hero card flips to flex column (image on top via `order: -1`, content below)

**Typography:** Uses `calc(var(--font-heading-scale) * 2.5rem)` for the hero heading so it respects Dawn's global heading scale setting. Body and description use `calc(var(--font-body-scale) * 1rem)`.

**Color approach:** Uses Dawn `color-{{ scheme_id }}` classes on all panels. Badge and sale badge use `color` type settings (inline style) since `#BCE599` has no matching scheme.

**Editable settings (all via theme editor):**

| Group | Settings |
|---|---|
| Hero Content | badge_text, badge_bg_color, badge_text_color, heading, description, button_label, button_link, hero_image |
| Sale Badge | show_sale_badge, sale_badge_text, sale_badge_bg_color, sale_badge_text_color |
| Right — Top Promo Block | promo_heading, promo_description, promo_link_label, promo_link_url |
| Right — Card 1 | card1_title, card1_description, card1_link, card1_image |
| Right — Card 2 | card2_title, card2_description, card2_link, card2_image |
| Color Schemes | color_scheme (section bg), hero_content_color_scheme, promo_block_color_scheme, cards_color_scheme |
| Padding | padding_top, padding_bottom |

**Defaults:** scheme-5 (section), scheme-1 (hero content panel), scheme-5 (promo block), scheme-2 (promo cards)
