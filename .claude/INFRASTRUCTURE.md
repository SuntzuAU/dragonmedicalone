# VRA Gateway Network — Infrastructure Reference

Last updated: 18 March 2026

## MANDATORY DEPLOYMENT CHECKLIST

- [ ] 1. Cloudflare Pages project created
- [ ] 2. Build settings: `npm run build`, output `dist`, env `PUBLIC_R2_BASE`
- [ ] 3. GitHub repo connected to SuntzuAU
- [ ] 4. Custom domains: BOTH apex AND www added in Pages
- [ ] 5. Custom domains show Active
- [ ] 6. Nameservers at Crazy Domains point to Cloudflare
- [ ] 7. DNS records correct (no old A records from previous host)
- [ ] 8. Logo file: `public/logo.jpg`
- [ ] 9. R2 images populated
- [ ] 10. GA4 ID in site.config.json
- [ ] 11. Account-level Bulk Redirects checked

## GA4 Measurement IDs (Account 428145)

| Domain | GA4 ID | Status |
|---|---|---|
| pdfsoftware.com.au | G-18L345NQ6C | Live |
| dragonprofessional16.com.au | G-Y6TT76JQMJ | Live |
| dragonnaturallyspeaking.com.au | G-V3JZSX7E0F | Live |
| dictationsolutions.com.au | G-74PW1ZVXZC | Live |
| dragonmedicalone.au | G-WGQD3PBYQ8 | Committed |
| speechrecognition.cloud | G-59XRLJXSS1 | Pending |
| cloudprinting.au | G-5JQ8BG0E6T | Pending |

## Cloudflare Infrastructure

| Item | Value |
|---|---|
| Account ID | d18cbb8c5ed07455ddfb863be62e61f8 |
| R2 Bucket | GATEWAY_IMAGES |
| R2 Public URL | https://pub-c7a09e1ddb7c45e6a38fcdca1e4b6897.r2.dev |
| Worker URL | https://master-image-generator.speech-recognition-cloud.workers.dev/generate |
| Worker model | gemini-3.1-flash-image-preview |
| DNS registrar | Crazy Domains (NS delegated to Cloudflare) |

## ActiveCampaign Form IDs

| Site | Form ID |
|---|---|
| pdfsoftware.com.au | 281 |
| dragonprofessional16.com.au | 283 |
| dragonnaturallyspeaking.com.au | 285 |
| dragonmedicalone.au | 289 |
