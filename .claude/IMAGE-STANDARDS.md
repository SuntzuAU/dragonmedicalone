# Image Standards — Sizes, Naming, Prompts, Manifest Schema

All images across the VRA gateway network must follow these standards.

## Standard Image Slots and Sizes

| Slot | Dimensions | Aspect Ratio | CSS Treatment |
|---|---|---|---|
| `hero` | 1200 x 675 | 16:9 | `aspect-ratio:16/9; object-fit:cover` |
| `about-banner` | 1200 x 675 | 16:9 | `.card-img` with `aspect-ratio:16/9` |
| `feature-*` | 800 x 450 | 16:9 | `.card-img` with `aspect-ratio:16/9` |
| `benefits-banner` | 1200 x 400 | 3:1 | `.img-break` with `height:220px` |
| `workflow-banner` | 1200 x 400 | 3:1 | `.img-break` |
| `emr-banner` | 1200 x 400 | 3:1 | `.img-break` |
| `cta-banner` | 1200 x 400 | 3:1 | `.img-break` styled inline |
| Blog `heroImage` | 1200 x 675 | 16:9 | Full-width with `object-fit:cover` |
| Blog `breakImage1` | 1200 x 400 | 3:1 | Cinematic strip in article body |
| Blog `breakImage2` | 1200 x 400 | 3:1 | Cinematic strip in article body |

## Key Rules

- **16:9** = people, workspaces, product interfaces
- **3:1** = wide cinematic strips, panoramic, abstract. Subject must be centred vertically (heavy top/bottom crop)
- **Always specify aspect ratio in Gemini prompt**
- **Never generate square or portrait images**

## SEO Image Naming

Slug-first format: `{site-id}/{yyyy}/{mm}/{dd}/{seo-slug}-{short-uuid}.{ext}`

- Slug max 60 chars, hyphens, lowercase
- Include product name and context keywords
- Include slot suffix: `-hero`, `-break1`, `-break2`, `-about`, `-feature-name`

## Manifest Schema

Every entry in `src/data/image-manifest.json`:

```json
{
  "hero": {
    "key": "hero",
    "r2Key": "site/2026/03/17/seo-slug-hero-a7b3c2d1.jpg",
    "altText": "Descriptive SEO alt text",
    "aspectRatio": "16:9",
    "slot": "hero",
    "contentType": "image/jpeg",
    "site": "sitename"
  }
}
```

## Blog Images — Use Frontmatter, Not Hardcoded URLs

Images referenced in frontmatter as R2 keys (NOT full URLs). The news template renders using `PUBLIC_R2_BASE` + key.

NEVER hardcode `https://pub-c7a09e1ddb7c45e6a38fcdca1e4b6897.r2.dev/...` in article markdown body.
