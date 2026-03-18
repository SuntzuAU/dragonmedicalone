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

## CRITICAL — ActiveCampaign Form: Two Separate Bugs, Both Fixed

### Bug 1: AC embed script hijacks form (client-side)

**NEVER use ActiveCampaign's own CSS class naming conventions in any form component.**

When a form uses AC's class names (`_form_289`, `_form_element`, `_field-wrapper`, `_submit`, `_form-thank-you`, etc.), AC's external tracking/embed script detects these classes, attaches itself, and enforces its own validation including phone format.

**Fix:** All form/wrapper classes use `vra-` prefix. Form `id` uses `vra_form_` prefix. See ACForm.astro as reference.

### Bug 2: AC server-side phone validation (server-side, harder to spot)

**NEVER use `name="phone"` for the phone input field.**

AC's `proc.php` endpoint treats `phone` as a reserved field name and validates it server-side, requiring international E.164 format (`+XXXXXXXXXXXXX`). It returns this error via JSONP callback to `_show_error` even when the field has no `required` attribute and even when our own JS doesn't validate it at all. Leaving the field blank bypasses this, but any text value triggers the rejection.

**Fix:** Map phone to a custom field instead: `name="field[36]"` (or whichever custom field ID is configured in AC for phone). Custom fields accept any text format with no format validation.

**The `cfields` map in the script must include the phone field ID:**
```js
window.cfields = {"35": "practice_organisation", "36": "phone_number", "18": "comments_about_your_needs"};
```

**Field mapping for form 289 (dragonmedicalone.au):**
- `field[35]` = practice_organisation
- `field[36]` = phone_number (custom text field - any format)
- `field[18]` = comments_about_your_needs

If you ever see "Please provide a valid phone number (format +XXXXXXXXXXXXX)" and the field is not `required`, the cause is `name="phone"`. Fix by remapping to `name="field[XX]"` where XX is a custom AC text field ID.

This rule applies to ALL sites in the network. Each site's ACForm component must use `field[XX]` for phone, never `name="phone"`.
