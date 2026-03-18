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

## CRITICAL — ActiveCampaign Form Phone Validation (Three Layers)

This has caused repeated issues. There are THREE separate mechanisms that trigger phone validation. All three must be avoided.

### Layer 1: AC embed script class detection (client-side)
AC's external embed script scans the page for elements with class names like `_form_289`, `_form_element`, `_field-wrapper`, `_submit` etc. If found, it attaches itself and adds phone validation.
**Fix:** Never use AC class names. All classes use `vra-` prefix. Form id uses `vra_form_` prefix.

### Layer 2: AC server-side phone field validation
AC's `proc.php` treats `name="phone"` as a reserved field and validates it server-side, requiring E.164 international format. Returns error via JSONP even when field is not required.
**Fix:** Never use `name="phone"`. Use `name="field[XX]"` mapped to a custom AC text field.

### Layer 3: AC intl-tel-input widget (the real root cause - hardest to spot)
AC's embed JS specifically looks for `id="phone"` and loads the `intl-tel-input` library on it:
```js
var inputPhone = form_to_submit.querySelector("#phone");
if(inputPhone) { initializePhoneInput(inputPhone); }
```
This widget enforces international phone number format validation regardless of `required` status. Any value that isn't a valid international number fails. Blank passes because the widget only validates non-empty values.
**Fix:** Never use `id="phone"`. Use `id="field36"` or similar.

### AC-side fix also available
In AC form editor → click the Phone field → right panel shows **"Remove phone number validation"** link at the bottom. Clicking this disables the intl-tel-input widget at the AC form level. Do this for every AC form in the network.

### Complete correct pattern for phone field:
```html
<!-- CORRECT: id and name both avoid AC's reserved 'phone' identifiers -->
<input type="text" id="field36" name="field[36]" placeholder="Your Phone Number" autocomplete="off" />
```
```js
// CORRECT: cfields maps field 36 to a label, no special phone handling
window.cfields = {"35": "practice_organisation", "36": "phone_number", "18": "comments_about_your_needs"};
```

**Field mapping for form 289 (dragonmedicalone.au):**
- `field[35]` = practice_organisation
- `field[36]` = phone_number (custom text field - any format)
- `field[18]` = comments_about_your_needs

This rule applies to ALL sites in the network. Never use `id="phone"` or `name="phone"` in any form.
