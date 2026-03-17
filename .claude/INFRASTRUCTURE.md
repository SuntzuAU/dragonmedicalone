# Infrastructure Reference - Dragon Medical One Australia

## Site Details

| Item | Value |
|---|---|
| Domain | dragonmedicalone.au |
| GA4 Measurement ID | G-WGQD3PBYQ8 |
| GitHub Repo | SuntzuAU/dragonmedicalone |
| Hosting | Cloudflare Pages |
| Stack | Astro |
| ActiveCampaign Form ID | 289 |

## Cloudflare Infrastructure

| Item | Value |
|---|---|
| Cloudflare Account ID | d18cbb8c5ed07455ddfb863be62e61f8 |
| R2 Bucket | GATEWAY_IMAGES |
| R2 Public Base URL | https://pub-c7a09e1ddb7c45e6a38fcdca1e4b6897.r2.dev |
| Image Worker URL | https://master-image-generator.speech-recognition-cloud.workers.dev/generate |
| DNS Registrar | Crazy Domains (nameservers to Cloudflare) |
| Cloudflare Nameservers | lindsey.ns.cloudflare.com / lynn.ns.cloudflare.com |

## Critical Rules

- Never use emoji/Unicode in site.config.json
- Never call image Worker autonomously
- Always add both apex and www as Cloudflare Pages custom domains
- Blog content in `src/content/news/` not `blog/`
- voicerecognition.com.au is Shopify - never redesign it
