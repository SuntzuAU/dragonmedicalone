# Build Rules - Architecture, Deployment, Images

## Why Astro

Astro is non-negotiable. Landing page performance is the primary SEO lever. Astro outputs static HTML by default with zero client-side JS unless explicitly added. Fast Core Web Vitals (LCP, CLS, FID) directly improve Google ranking. Never introduce React, Vue, or any client-side framework for content pages.

## Architecture Pattern

The reference pattern is `pdfsoftware.com.au`:

- Single self-contained `index.astro` - no separate Nav component
- All content driven from `src/site.config.json`
- EMR integration pages as standalone `.astro` files in `src/pages/`
- Dragon Copilot as standalone page
- Images served from Cloudflare R2 via `PUBLIC_R2_BASE` env var
- Blog posts in `src/content/news/` with required frontmatter

## Content Collection Standard

- Content folder: `src/content/news/`
- Collection name: `news`
- Page routes: `src/pages/news/` and `src/pages/news/[slug].astro`
- URL pattern: `/news/post-slug`
- Do NOT create or use a `blog` collection

## CSS Rules

- Never use `var(--primary)` for `background-color` on dark sections in standalone pages
- Extract colours in frontmatter as JS variables and apply via inline style
- Gradient elements use `primaryLight` colour from config

## Performance Rules

- Minimise JavaScript - defer, lazy load, or eliminate
- YouTube/video embeds must use thumbnail facade (load iframe on click only)
- All images except hero: `loading="lazy"` and `decoding="async"`
- Hero images: `loading="eager"`
- System fonts where possible
- Mobile first: all layouts must work at 375px minimum

## Deployment

- Hosting: Cloudflare Pages
- Both apex domain AND `www` must be added as custom domains
- `PUBLIC_R2_BASE` must be set in Cloudflare Pages env vars
- Value: `https://pub-c7a09e1ddb7c45e6a38fcdca1e4b6897.r2.dev`

## Image Generation - NEVER Autonomous

Prepare prompts and filenames, show Russ, wait for manual trigger.

## Technical Gotchas

- Never use emoji/Unicode in site.config.json
- YAML frontmatter must have spaces after colons
- `push_files` cannot modify `.github/workflows/` files
- Both apex and www must be added as Cloudflare Pages custom domains

## CRITICAL — ActiveCampaign Form Class Names

**NEVER use ActiveCampaign's own CSS class naming conventions in the ACForm component.**

When a form uses AC's class names (`_form_289`, `_form_element`, `_field-wrapper`, `_submit`, `_form-thank-you`, etc.), ActiveCampaign's external tracking/embed script detects these classes in the browser, attaches itself to the form, and enforces its own validation — including requiring phone numbers in `+XXXXXXXXXXXXX` international format. This causes the form to block submission even though phone is not a required field in AC.

**The correct pattern (already implemented in ACForm.astro):**
- Form `id` must use `vra_form_` prefix (e.g. `vra_form_289`), NOT `_form_289_`
- All wrapper classes must use `vra-` prefix: `vra-form-content`, `vra-field`, `vra-submit`, `vra-thank-you`, `vra-error-msg`
- No AC class names anywhere in the form HTML or surrounding elements
- The form still submits correctly to `voicerecognition.activehosted.com/proc.php` via JSONP
- All JS references inside `<script>` must use the `vra_form_` ID pattern

**Phone field rule:** Phone must NEVER have a `required` attribute and must NEVER be validated for format. Any format or blank is acceptable. The JS validate_form function must only validate fields with `required` attribute plus the `email` field (email format check only).

If you ever see the error "Please provide a valid phone number (format +XXXXXXXXXXXXX)" on a live form, the cause is AC class names in the form HTML. Fix by renaming all classes to `vra-` prefix as above.
