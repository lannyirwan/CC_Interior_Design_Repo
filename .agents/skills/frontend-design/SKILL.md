---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Specialized for Oriental interior design with Zen style using green and sky blue palette. Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that embody **Oriental interior design with Zen aesthetics** — wabi-sabi (imperfect beauty), ma (negative space), and kanso (simplicity). Implement real working code with exceptional attention to aesthetic details rooted in East Asian design tradition.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

---

## Project Specialization: Oriental Zen Interior Design

All interfaces default to this Zen-Oriental aesthetic unless the user explicitly requests otherwise. The visual language draws from Japanese, Chinese, and broader East Asian interior design traditions — serene, deliberate, and deeply considered.

### Mandatory Color Palette

Always define and use these CSS custom properties. Green and sky blue are the twin pillars:

```css
:root {
  /* Greens — from whisper to deep forest */
  --zen-sage:     #8FAF8A;   /* muted sage — primary accent */
  --zen-moss:     #5C7A4E;   /* deep moss — hover states, strong borders */
  --zen-jade:     #3D6B4F;   /* jade — headings, key UI elements */
  --zen-bamboo:   #A8C5A0;   /* light bamboo — card backgrounds, fills */
  --zen-matcha:   #C8D8B8;   /* pale matcha — section backgrounds */

  /* Sky Blues — from haze to deep horizon */
  --zen-mist:     #B8D8E8;   /* morning mist — subtle section fills */
  --zen-sky:      #7AB8D4;   /* clear sky — secondary accent */
  --zen-celadon:  #5A9BB5;   /* celadon — active states, links */
  --zen-horizon:  #3A7A9B;   /* deep horizon — strong contrast elements */

  /* Neutrals — paper, stone, ink */
  --zen-washi:    #F5F0E8;   /* washi paper — light mode background */
  --zen-linen:    #EDE8DC;   /* natural linen — card surfaces */
  --zen-stone:    #C8BEA8;   /* worn stone — borders, dividers */
  --zen-ash:      #8A8070;   /* ash — muted/secondary text */
  --zen-ink:      #2A2520;   /* sumi ink — primary text */
  --zen-charcoal: #1A1A18;   /* deep charcoal — dark mode background */

  /* Optional third accent */
  --zen-gold:     #C9A96E;   /* antique gold — use sparingly, luxury details */
}
```

**Color usage rules:**
- Light mode background: `--zen-washi`; dark mode: `--zen-charcoal`
- Primary accents: `--zen-sage` and `--zen-sky` in balanced proportion
- Headings: `--zen-jade` (light) / `--zen-bamboo` (dark)
- Hover transitions: `--zen-sage` → `--zen-moss`, `--zen-sky` → `--zen-celadon`
- Never use pure `#000` or `#fff` — always the nearest Zen neutral
- `--zen-gold` appears only as a detail: icon strokes, thin borders, selected states

### Typography Stack

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400&family=Lato:wght@300;400&display=swap" rel="stylesheet">
```

| Role | Font | Notes |
|------|------|-------|
| Display / H1–H2 | `Cormorant Garamond` | Calligraphic elegance; use italic for poetic phrases |
| Labels / Nav / Caps | `Josefin Sans` 300–400 | `letter-spacing: 0.15em; text-transform: uppercase` |
| Body / H3–H6 | `Lato` 300–400 | Light weight only; never bold body text |

**Never use:** Inter, Roboto, Arial, Helvetica, or any system font stack.

### Zen Design Principles

Apply these in every interface:

- **Ma (負 間) — Negative space**: Whitespace is not emptiness; it is presence and breath. Sections need generous padding. Let elements rest.
- **Wabi-sabi**: Subtle imperfection over clinical perfection — organic textures, asymmetric layouts, hand-crafted feeling details
- **Asymmetric balance**: Offset grids, elements that deliberately break alignment. A heading that sits 60% left is more interesting than centered.
- **Natural forms**: Curves inspired by bamboo, water, and stone. Avoid hard 90° corners in decorative elements; use `border-radius` generously on containers.
- **Layered depth**: `::before` / `::after` pseudo-elements for ink-wash overlays, mist gradients fading to transparency, subtle grain on backgrounds
- **Dividers**: Thin `1px solid var(--zen-stone)` lines, sometimes broken (`border-style: dashed` with wide `gap`) to suggest brushstrokes

### Motion Philosophy

Zen motion is slow, inevitable, and calm — never energetic:

```css
/* Base transition — use everywhere */
transition: all 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Scroll reveal */
@keyframes zenReveal {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- Page / scroll reveals: fade up from `translateY(28px)`, `800ms ease-out`
- Hover: gentle `scale(1.025)` + color shift, `600ms`
- Loading states: soft pulse like a lantern in wind, `opacity: 0.6 ↔ 1`
- Autoplay (sliders, etc.): `5000ms+` intervals — never rushed
- **Avoid**: bounce, spring physics, rapid flicker, parallax faster than scroll speed

### Spatial Composition

- **Hero**: Full-width asymmetric split — interior photography (60%) beside headline and CTA (40%); headline left-aligned, never centered
- **Sections**: Full-bleed `--zen-washi` / `--zen-matcha` / `--zen-mist` alternating; separated by stone-line dividers
- **Cards / Grids**: Unequal columns (e.g. 58/42, or a masonry layout) — never rigid equal-width grids
- **Padding**: `clamp(60px, 8vw, 120px)` inline on desktop; `24px` on mobile — always generous
- **Photography overlays**: Apply `background: radial-gradient(ellipse at center, transparent 50%, rgba(42,37,32,0.2) 100%)` for subtle vignette on all interior images

---

## Design Thinking

Before coding, answer these for every build:
- **Purpose**: What is this interface for? Who sits with it?
- **Tone**: Always Zen-Oriental — refined minimalism with organic warmth. Never cold modernism, never corporate blue.
- **Constraints**: Framework, performance, accessibility requirements
- **The one thing**: What single element will make a visitor pause and feel the stillness?

**CRITICAL**: Execute the Zen vision with precision. Restraint is discipline, not absence.

Implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and fully functional
- Visually serene yet quietly memorable
- Cohesive — every color, spacing, and font choice traces back to the Zen palette
- Meticulously refined in spacing, hierarchy, and typographic rhythm

## Frontend Aesthetics Guidelines

- **Typography**: Always use the Zen font stack. Cormorant Garamond at large sizes with `letter-spacing: 0.04em` creates instant elegance.
- **Color & Theme**: Build exclusively from the Zen palette above. Dominant green and sky-blue pairings; ink and washi neutrals for structure.
- **Motion**: Slow, deliberate, serene — see Motion Philosophy above.
- **Spatial Composition**: Ma and asymmetry are the primary tools — see Spatial Composition above.
- **Backgrounds & Textures**: Washi grain via SVG `feTurbulence`, ink-wash gradients, misty overlays at 10–20% opacity over photography. Use `mix-blend-mode: multiply` on texture layers.

NEVER use: Inter, Roboto, Arial; purple gradients; neon accents; centered symmetrical hero layouts; corporate grid patterns; or anything that feels like a SaaS dashboard. This is an Oriental Zen luxury interior brand.

**IMPORTANT**: Minimalism here means precision — perfect spacing, perfect color rhythm, perfect motion timing. Simple surfaces require the most careful execution.

Remember: Zen design is full of invisible intention. The empty space is as designed as the filled space. Show that mastery.
