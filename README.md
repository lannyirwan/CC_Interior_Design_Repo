# CC Interiors — Luxury Interior Design Landing Page

A modern, fully-responsive one-page landing site for a luxury interior design studio. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no dependencies.

## Live Preview

> Open `index.html` directly in any browser. No server required.

## Features

- **Sticky glassmorphism navbar** — transparent on load, frosted-glass on scroll, with active section tracking
- **Full-screen hero** — Ken-Burns zoom animation, staggered fade-up text, dual CTA buttons
- **About section** — overlapping image layout with animated statistics counter
- **Services grid** — 4 cards with gold accent reveal and icon hover effects
- **Portfolio gallery** — 8 projects across 4 categories (Living Room, Bedroom, Office, Kitchen) with category filter and lightbox viewer
- **Testimonials slider** — auto-playing carousel with touch/swipe support and dot navigation
- **Contact form** — client-side validation + FormSubmit AJAX integration (no backend needed)
- **Dark / Light mode** — persisted to `localStorage`, respects `prefers-color-scheme` on first visit
- **Floating WhatsApp button** + **back-to-top button**
- **Scroll reveal animations** — staggered via Intersection Observer

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styles | CSS3 (custom properties, grid, flexbox, `aspect-ratio`) |
| Scripts | Vanilla ES6+ JavaScript |
| Fonts | Google Fonts — Playfair Display + Inter |
| Icons | Font Awesome 6.5 (CDN) |
| Images | Unsplash (CDN) |
| Form | [FormSubmit](https://formsubmit.co/) AJAX endpoint |

## Project Structure

```
├── index.html      # All markup — sections in DOM order
├── style.css       # All styles — CSS variables, components, responsive breakpoints
├── script.js       # All interactivity — flat module, feature blocks in order
├── CLAUDE.md       # AI assistant guidance for this repo
└── README.md
```

## Customisation

### Brand colours
All colour tokens are CSS variables in `:root` at the top of `style.css`:
```css
--gold:    #C9A96E;
--cream:   #F5EFE6;
--dark:    #1C1917;
```

### Contact form email
Update the fetch URL in `script.js`:
```js
fetch('https://formsubmit.co/ajax/YOUR@EMAIL.COM', { ... })
```

### Adding a portfolio item
Add a `.portfolio-item` div inside `#portfolioGrid` in `index.html`:
```html
<div class="portfolio-item reveal" data-category="living|bedroom|office|kitchen">
  <div class="p-img-wrap">
    <img src="YOUR_IMAGE_URL" alt="Project Name" loading="lazy">
    <div class="p-overlay">
      <div class="p-info">
        <span class="p-cat">Category</span>
        <h3>Project Name</h3>
        <p>Location</p>
      </div>
      <button class="p-zoom"
        data-img="FULL_RES_URL"
        data-title="Project Name"
        aria-label="View full image">
        <i class="fas fa-expand-alt"></i>
      </button>
    </div>
  </div>
</div>
```

### Adding a testimonial
Duplicate any `.t-card` block inside `#sliderTrack` in `index.html` — dots are generated automatically by JavaScript.

## Responsive Breakpoints

| Breakpoint | Layout changes |
|------------|---------------|
| `≤ 1024px` | Services and portfolio collapse to 2 columns; footer to 2 columns |
| `≤ 768px`  | Hamburger nav, single-column about/contact/services/footer |
| `≤ 480px`  | Single-column portfolio, stacked hero CTAs |

## Credits

- Photography — [Unsplash](https://unsplash.com/)
- Icons — [Font Awesome](https://fontawesome.com/)
- Typography — [Google Fonts](https://fonts.google.com/)
- Form handling — [FormSubmit](https://formsubmit.co/)

## License

MIT — free to use and adapt for any project.
