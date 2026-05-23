You are performing a full GitHub sync for the CC Interiors project. Execute each step in order. Do not skip any step.

---

## Step 1 — Secret scan (MUST run first, abort if secrets found)

Search every tracked file for patterns that indicate secrets. Run the following checks and **stop immediately** if any match is found outside of an expected safe context:

- API keys / tokens: patterns like `sk-`, `ghp_`, `xoxb-`, `AKIA`, `AIza`, `ya29.`
- Passwords in code: `password\s*=\s*["'][^"']{4,}`, `passwd\s*=`, `secret\s*=\s*["']`
- Private keys: `-----BEGIN (RSA|EC|OPENSSH|PGP) PRIVATE KEY`
- `.env` files: any file named `.env`, `.env.local`, `.env.production`
- Hard-coded email/password combos beyond the FormSubmit endpoint (which is intentionally public)

The one allowed exception is the FormSubmit URL in `script.js` — `https://formsubmit.co/ajax/lannyirwan@gmail.com` is public by design.

If any secret pattern is found: **stop, report the finding to the user, and do not proceed.**

Use Grep to search across all non-`.git` files.

---

## Step 2 — Rewrite README.md

Rewrite `README.md` completely using the style below. Follow the alfredang/ai-cms README style exactly: centered header block, shields.io badges, bold tagline, live demo link, then content sections in order.

Adapt all content specifically for CC Interiors. Use this template:

```markdown
<div align="center">

# CC Interiors — Luxury Interior Design

[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5-528DD7?logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![Google Fonts](https://img.shields.io/badge/Google_Fonts-Playfair_Display-4285F4?logo=google&logoColor=white)](https://fonts.google.com/)
[![FormSubmit](https://img.shields.io/badge/FormSubmit-AJAX-00C853)](https://formsubmit.co/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-222?logo=github&logoColor=white)](https://lannyirwan.github.io/CC_Interior_Design_Repo/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**A fully-static, single-page luxury interior design landing page — zero build step, zero dependencies, open directly in any browser.**

🌐 **Live site:** [https://lannyirwan.github.io/CC_Interior_Design_Repo/](https://lannyirwan.github.io/CC_Interior_Design_Repo/)

</div>

## Screenshot

<!-- Replace with an actual screenshot once the site is live -->
![CC Interiors Screenshot](https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1280&q=80)

## About

CC Interiors is a production-ready marketing landing page for a luxury interior design studio. Built on pure **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no npm install. Every section is crafted for visual impact and lead capture: a Ken-Burns hero, an animated statistics counter, a filterable portfolio gallery with a lightbox viewer, a touch-enabled testimonials carousel, and a serverless AJAX contact form — all deployable by opening a single file.

The site ships with a complete **dark / light mode** system driven by CSS custom properties and a `data-theme` attribute, a fully accessible hamburger navigation, scroll-reveal animations via Intersection Observer, and a floating WhatsApp CTA. Hosted on **GitHub Pages** via a one-step GitHub Actions workflow.

## Key Features

### Visual experience
- **Full-screen hero** — Ken-Burns zoom animation, staggered fade-up headline + subhead + dual CTAs
- **Glassmorphism navbar** — transparent on load, frosted-glass + shadow on scroll, active-section tracking via `IntersectionObserver`
- **Scroll reveal** — every `.reveal` element fades and slides in with a `sibling-index × 80ms` stagger delay; unobserves after first fire

### Portfolio & lightbox
- **Filterable gallery** — 8 projects across 4 categories (Living Room, Bedroom, Office, Kitchen); animate-out → `display:none` → animate-in with double `requestAnimationFrame`
- **Lightbox viewer** — opens on `.p-zoom` click; closes on backdrop, close button, or `Escape`; clears `src` after 350ms transition so no ghost image remains

### Testimonials
- **Auto-playing carousel** — `translateX(-n × 100%)` track; dots auto-generated from card count; autoplay resets on any manual interaction; 48px swipe threshold for touch

### Contact & lead capture
- **AJAX contact form** — POSTs to `https://formsubmit.co/ajax/` via `fetch()`; shows `.loading` state on submit button; swaps form for a success message on `200 OK` — no backend required
- **Floating WhatsApp button** — persistent CTA visible on all scroll positions

### Theme & accessibility
- **Dark / light mode** — reads `localStorage` on init, falls back to `prefers-color-scheme`; subsequent toggles write to `localStorage`; all colors driven by CSS custom properties in `:root` with a `[data-theme="dark"]` override block — no media queries in CSS
- **Animated statistics counter** — `IntersectionObserver` on `.about-stats`; reads `data-target`; eases over 1800ms

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | Semantic HTML5 |
| **Styles** | CSS3 — custom properties, grid, flexbox, `aspect-ratio` |
| **Scripts** | Vanilla ES6+ JavaScript (flat module, no bundler) |
| **Fonts** | Google Fonts — Playfair Display (headings) + Inter (body) |
| **Icons** | Font Awesome 6.5 (CDN) |
| **Images** | Unsplash (CDN) |
| **Form** | FormSubmit AJAX endpoint — no server-side code |
| **Hosting** | GitHub Pages via GitHub Actions |

## Project Structure

```
├── index.html          # All markup — sections in DOM order
├── style.css           # All styles — CSS variables, components, breakpoints
├── script.js           # All interactivity — flat module, feature blocks in order
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions — auto-deploy to gh-pages on push to main
├── CLAUDE.md           # AI assistant guidance for this repo
└── README.md
```

## Customisation

### Brand colours
All colour tokens live in `:root` at the top of `style.css`. Change these three to rebrand entirely:
```css
--gold:  #C9A96E;
--cream: #F5EFE6;
--dark:  #1C1917;
```

### Contact form email
Update the `fetch` URL in `script.js`:
```js
fetch('https://formsubmit.co/ajax/YOUR@EMAIL.COM', { ... })
```

### Adding a portfolio item
Add a `.portfolio-item` div inside `#portfolioGrid` in `index.html`. Set `data-category` to one of `living`, `bedroom`, `office`, or `kitchen`. The JS filter and lightbox pick it up automatically:
```html
<div class="portfolio-item reveal" data-category="living">
  <div class="p-img-wrap">
    <img src="YOUR_IMAGE_URL" alt="Project Name" loading="lazy">
    <div class="p-overlay">
      <div class="p-info">
        <span class="p-cat">Living Room</span>
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
Duplicate any `.t-card` block inside `#sliderTrack` in `index.html` — the dot navigation is auto-generated by JavaScript from the card count.

## Responsive Breakpoints

| Breakpoint | Layout changes |
|------------|---------------|
| `≤ 1024px` | Services and portfolio collapse to 2 columns; footer to 2 columns |
| `≤ 768px`  | Hamburger navigation, single-column about / contact / services / footer |
| `≤ 480px`  | Single-column portfolio grid, stacked hero CTAs |

## Deployment

The site is hosted on **GitHub Pages** and deploys automatically via GitHub Actions on every push to `main`. No manual steps required.

To deploy your own fork:
1. Fork or clone this repo to your GitHub account.
2. Go to **Settings → Pages** and ensure the source is set to the `gh-pages` branch.
3. Push any change to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest.

## Credits

- Photography — [Unsplash](https://unsplash.com/)
- Icons — [Font Awesome](https://fontawesome.com/)
- Typography — [Google Fonts](https://fonts.google.com/)
- Form handling — [FormSubmit](https://formsubmit.co/)

## License

MIT — free to use and adapt for any project.
```

Write this content verbatim to `README.md`.

---

## Step 3 — Stage and commit

Stage only the project source files — never stage `.env` files, files containing credentials, or any file that failed the secret scan in Step 1.

Files to stage:
- `index.html`
- `style.css`
- `script.js`
- `README.md`
- `.github/workflows/deploy.yml`
- `CLAUDE.md`
- `.claude/commands/gitupdate.md`

Run:
```
git add index.html style.css script.js README.md .github/workflows/deploy.yml CLAUDE.md .claude/commands/gitupdate.md
git status
```

Review the staged files list. Abort if anything unexpected appears.

Then commit:
```
git commit -m "update site, README, and gitupdate command"
```

---

## Step 4 — Push to GitHub

```
git push origin main
```

Confirm the push succeeded. GitHub Actions will automatically trigger the `Deploy to GitHub Pages` workflow on `main` push — no manual step needed.

---

## Step 5 — Update repository About (description, website, topics)

Use the GitHub CLI to update the repo metadata:

```
gh repo edit lannyirwan/CC_Interior_Design_Repo \
  --description "Luxury interior design landing page — static HTML/CSS/JS, dark mode, portfolio lightbox, FormSubmit contact form. Deployed on GitHub Pages." \
  --homepage "https://lannyirwan.github.io/CC_Interior_Design_Repo/" \
  --add-topic "html" \
  --add-topic "css" \
  --add-topic "javascript" \
  --add-topic "landing-page" \
  --add-topic "interior-design" \
  --add-topic "github-pages" \
  --add-topic "static-site" \
  --add-topic "dark-mode"
```

---

## Step 6 — Final report

After all steps complete, report back with:
- Confirmation that the secret scan found nothing
- The README sections written
- The commit hash and push status
- The GitHub Pages workflow trigger status
- The repo About fields that were set
- The live site URL: `https://lannyirwan.github.io/CC_Interior_Design_Repo/`
