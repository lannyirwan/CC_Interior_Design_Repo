# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A fully-static, single-page luxury interior design landing page for **CC Interiors**. Zero build step, zero dependencies installed locally — open `index.html` directly in a browser.

## Running the Site

```bash
# Any of these work — no server required
start index.html          # Windows default browser
python -m http.server 8080  # Optional: serve locally to avoid CORS on images
npx serve .               # Optional: if Node is available
```

## File Structure

Three files, strict separation of concerns:

| File | Role |
|------|------|
| `index.html` | All markup and content. Sections follow DOM order: navbar → hero → about → services → portfolio → lightbox → testimonials → contact → footer + floating elements. |
| `style.css` | All styles. Organized top-to-bottom matching HTML section order. |
| `script.js` | All interactivity. DOM refs declared at the top; each feature is a clearly-commented block below. |

## CSS Architecture

All theme tokens live in `:root` at the top of `style.css`. Dark mode is handled exclusively by a `[data-theme="dark"]` override block — never use `prefers-color-scheme` media queries in CSS; the JS reads that preference only once at init and then uses the attribute.

Key token names to know:
- Colors: `--gold`, `--gold-lt`, `--gold-dk`, `--cream`, `--beige`, `--dark`, `--darker`
- Semantic: `--bg`, `--bg-alt`, `--bg-card`, `--text`, `--text-sub`, `--text-muted`
- Layout: `--max-w` (1280px), `--nav-h`, `--sec-pad`
- Transitions: `--t-fast`, `--t-base`, `--t-slow`

Responsive breakpoints: `1024px` → `768px` → `480px` (all at the bottom of `style.css`).

## JS Architecture

`script.js` is a single flat module (no classes, no bundler). Sections in order:

1. **DOM refs** — every `getElementById`/`querySelector` call is at the top; add new ones here before using them in handlers.
2. **Theme toggle** — reads `localStorage` → falls back to `prefers-color-scheme`; sets `data-theme` attribute on `<html>`.
3. **Navbar scroll** — single passive `scroll` listener handles: `.scrolled` class on navbar, `.visible` on back-to-top, and active nav link tracking.
4. **Mobile nav** — hamburger open/close; `nav-overlay` div acts as the backdrop.
5. **Scroll reveal** — `IntersectionObserver` on every `.reveal` element; stagger delay = `siblingIndex × 80ms`; unobserves after first reveal.
6. **Stats counter** — second `IntersectionObserver` on `.about-stats`; reads `data-target` attribute; animates over 1800ms.
7. **Portfolio filter** — animate-out (opacity + scale) → `setTimeout 310ms` → `display:none`; animate-in reverses with double `requestAnimationFrame`.
8. **Lightbox** — opens on `.p-zoom` button click; closes on backdrop, close button, or `Escape`; clears `src` after 350ms transition.
9. **Testimonials slider** — `translateX(-n * 100%)` on `#sliderTrack`; dots auto-generated from card count; autoplay resets on any manual interaction; touch threshold 48px.
10. **Form** — POSTs to `https://formsubmit.co/ajax/lannyirwan@gmail.com` via `fetch()`; shows `.loading` state on button; swaps form for `#formSuccess` on 200 OK.
11. **Back to top** — smooth scroll to 0.

## Adding a New Portfolio Item

1. Add a `.portfolio-item` div with `data-category="<living|bedroom|office|kitchen>"` inside `#portfolioGrid` in `index.html`.
2. Include a `.p-zoom` button with `data-img` (full-res URL) and `data-title` attributes — the lightbox and JS filter pick these up automatically.

## External Dependencies (CDN only)

- **Google Fonts**: Playfair Display (headings) + Inter (body)
- **Font Awesome 6.5**: icons via `<i class="fas|fab fa-*">`
- **Unsplash**: all images — URL pattern `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&q=80`
- **FormSubmit**: `https://formsubmit.co/ajax/{email}` — AJAX endpoint, no server-side code needed

## Naming Conventions

- CSS: BEM-lite (block + modifier), short prefixes for scoped components (`p-` for portfolio, `lb-` for lightbox, `t-` for testimonials, `s-` for slider, `c-` for contact items, `wa-` for WhatsApp).
- JS: camelCase variables, feature blocks separated by banner comments.
- HTML IDs are used for JS hooks; classes are used for CSS styling — don't use the same name for both unless intentional.
