# Build Rules — Architecture, Deployment, Images

## Why Astro

Astro is non-negotiable. Landing page performance is the primary SEO lever. Astro outputs static HTML by default with zero client-side JS unless explicitly added. Fast Core Web Vitals (LCP, CLS, FID) directly improve Google ranking. Never introduce React, Vue, or any client-side framework for content pages.

## Architecture Pattern

The reference pattern is `dragonprofessional16.com.au`:

- Single self-contained `index.astro` — no separate Nav component that imports pages for CSS variables
- All content driven from `src/site.config.json`
- Product subpages use `[product].astro` dynamic route
- Images served from Cloudflare R2 via `PUBLIC_R2_BASE` env var
- Blog posts in `src/content/news/` with required frontmatter

## Site Type Variants

Not every site in the network is a product gateway. The `siteType` field in `site.config.json` controls which sections render:

- `"siteType": "gateway"` — default. Hero, stats bar, benefits, pricing, comparison table, features, about, FAQ, CTA form.
- `"siteType": "saas"` — SaaS product (e.g. speechrecognition.cloud). Hero, video, pricing tiers, feature grid, integrations, FAQ, signup CTA.
- `"siteType": "authority"` — content hub (e.g. voicerecognition.com.au redesign). Hero, featured articles, category navigation, about, newsletter CTA.

When building index.astro for a new site, wrap each section in a conditional: `{(site.siteType === 'gateway' || !site.siteType) && ( ... )}`. This keeps one template file but allows different layouts per site.

## Content Collection Standard

- Content folder: `src/content/news/`
- Collection name in config.ts: `news`
- Page routes: `src/pages/news/` and `src/pages/news.astro`
- URL pattern: `/news/post-slug`
- Do NOT create or use a `blog` collection or `src/content/blog/` folder

## CSS Rules

- Never use `var(--primary)` or `var(--accent)` for `background-color` on dark sections in `[product].astro`
- Extract colours in frontmatter as JS variables and apply via inline style
- `define:vars` works on `index.astro` but CSS class selectors for dark backgrounds need inline styles

## Performance Rules

- Minimise JavaScript — defer, lazy load, or eliminate
- YouTube/video embeds MUST use the facade pattern (see YouTube Facade section below)
- All images except hero: `loading="lazy"` and `decoding="async"`
- Hero images: `loading="eager"`
- Inline critical CSS using `is:inline` for above-the-fold content
- No third-party render-blocking scripts
- System fonts where possible; custom fonts use `font-display: swap`
- Mobile first: all layouts must work at 375px minimum

## YouTube Facade Pattern — MANDATORY

Never load a YouTube iframe at page load. Always use a click-to-load facade. This saves 500KB+ of JS on initial load.

The working reference implementation is in `dragonmedicalone/src/pages/index.astro` under the `.yt-facade` class. Copy it exactly:

1. Show a thumbnail image: `https://i.ytimg.com/vi/{YOUTUBE_ID}/maxresdefault.jpg` with `loading="lazy" decoding="async"`
2. Overlay a play button (red, centred)
3. On click, replace the entire element content with an iframe: `https://www.youtube-nocookie.com/embed/{ID}?autoplay=1&rel=0&modestbranding=1`
4. Use `youtube-nocookie.com` (not `youtube.com`) for privacy
5. The facade container uses `padding-bottom:56.25%` for 16:9 aspect ratio

Do NOT deviate from this pattern. Do NOT load YouTube JS/iframe at page load under any circumstances.

## CLOUDFLARE PAGES DEPLOYMENT — PRESENT THIS CHECKLIST AUTOMATICALLY

**TRIGGER RULE: The moment the last file commit for a new site build is complete, Claude MUST immediately present the full deployment checklist to Russ with the specific values for that site pre-filled. Do not wait to be asked.**

See INFRASTRUCTURE.md for the full deployment checklist.

## ActiveCampaign Form — NEVER REWRITE

### CRITICAL RULE: Copy the template, never start from scratch

The frozen form template is `src/components/ACForm.template.astro` in `astro-gateway-master`. When building a new site:

1. Copy `ACForm.template.astro` to `src/components/ACForm.astro`
2. Change ONLY these values (all found in `site.config.json` under `form`):
   - Form ID number (e.g. 283 -> 289)
   - The `or` hidden field UUID
   - The `cfields` mapping if the form has different custom fields
   - The submit button colour (driven from `site.colours.accent`)
3. Do NOT change anything else. Do NOT add validation. Do NOT change field types.

### Phone field rules
- The phone field has NO `required` attribute — it is always optional
- Input type is `text` not `tel`
- Do NOT add `type="tel"` or `required` to the phone field under any circumstances

### Form IDs per site

| Site | Form ID |
|---|---|
| pdfsoftware.com.au | 281 |
| dragonprofessional16.com.au | 283 |
| dragonnaturallyspeaking.com.au | 285 |
| dragonmedicalone.au | 289 |
| dictationsolutions.com.au | TBC |

## Image Generation — Three Methods

See `.claude/IMAGE-STANDARDS.md` for sizes, naming, and prompt templates.

**NEVER generate images without owner approval.**

### Method 1: Claude calls Worker via Chrome MCP javascript_tool
### Method 2: Russ triggers manually in Cloudflare Worker dashboard
### Method 3: curl commands for terminal

**NEVER stall the build waiting for images.** Commit with placeholder fallbacks if needed.

## Technical Gotchas

- Never use emoji/special Unicode in `site.config.json`
- YAML frontmatter must have spaces after colons
- `push_files` cannot modify `.github/workflows/` files
- Both apex and www must be added as Cloudflare Pages custom domains
- Cloudflare Pages 301 redirects are cached aggressively — test in incognito
- Logo files are JPEG (`public/logo.jpg`)
