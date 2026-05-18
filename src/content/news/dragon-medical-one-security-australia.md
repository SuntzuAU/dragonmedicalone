---
title: "Dragon Medical One security and Australian data residency: what to tell your IT team"
date: "2026-05-18"
metaDescription: "Where Dragon Medical One processes audio for Australian customers, what's encrypted, what isn't, and the questions an IT or compliance team will ask before deployment."
heroImage: "feature-cloud-security"
heroImageAlt: "Dragon Medical One cloud security - Microsoft Azure with Australian data residency"
---

Dragon Medical One runs on Microsoft Azure. Subscriptions sold by Voice Recognition Australia are provisioned on the Australian Azure tenant, so audio and transcribed text are processed in Australia, not overseas. This article covers the specifics: which encryption standards apply, which certifications cover the underlying platform, what is and isn't stored, and the questions an IT or compliance team will want answered before a deployment.

**The short version:** Dragon Medical One is hosted on Microsoft Azure with Australian-region processing for AU subscriptions. Audio is streamed for recognition and is not retained on the client device. Traffic is encrypted in transit (TLS 1.2, AES-256) and at rest. The underlying Azure platform is HITRUST CSF certified and ISO 27001 certified. Voice Recognition Australia handles enrolment, configuration, and ongoing support locally.

## Where Dragon Medical One processes audio for Australian customers

Dragon Medical One is a cloud service. The desktop app on the clinician's PC captures audio and streams it to Nuance/Microsoft servers, which perform recognition and stream text back. For subscriptions sold by Voice Recognition Australia, the service is provisioned on the Australian Azure tenant, with two geographically distributed Azure regions in Australia for resilience.

The implication for an Australian healthcare buyer: audio recognition happens inside Australia, not the US or EU. That matters for Privacy Act compliance, hospital procurement, and conversations with information security officers who ask *where does the data go?*

## What's stored, what isn't

- **Audio recordings.** Streamed for recognition. Not retained on the client device. Refer to current Microsoft/Nuance documentation for retention policies on the cloud side.
- **Transcribed text.** Written to whichever clinical application the clinician was dictating into (Best Practice, Genie, Medical Director, Shexie, Gentu, etc.). Not stored in Dragon Medical One as a clinical record.
- **User profile.** Stored in the cloud, linked to the clinician's account. Includes personal vocabulary additions, AutoText shortcuts, and custom voice commands.
- **Specialty vocabulary.** Selected at login (general practice, cardiology, oncology, radiology, etc.). Loaded from the Microsoft/Nuance vocabulary set.
- **Usage analytics.** Aggregate usage data available to system administrators via the Nuance Management Center for hospital/enterprise deployments.

Verify current retention and data handling specifics directly with Voice Recognition Australia or in your tenancy contract. Cloud product details can change without notice.

## Encryption and certifications

Three security claims are documented by Microsoft for the Azure infrastructure Dragon Medical One runs on:

- **Encryption in transit:** TLS 1.2 with AES-256.
- **Encryption at rest:** AES-256 on Azure storage.
- **Infrastructure certifications:** HITRUST CSF certified, ISO 27001 certified, plus the wider Azure compliance posture (GDPR, SOC 2 Type II) on the underlying platform.

The certifications listed apply to the Azure platform Dragon Medical One is deployed on. They are public Microsoft/Nuance claims. Healthcare buyers should request current compliance documentation from Microsoft or Voice Recognition Australia as part of procurement.

## How this compares to other dictation options

Australian healthcare buyers comparing options usually look at several security postures:

- **Dragon Medical One.** Cloud, Australian Azure tenant for AU subscriptions, encrypted in transit and at rest, HITRUST CSF and ISO 27001 on Azure infrastructure.
- **Dragon Professional 16 (desktop).** Fully local on the clinician's Windows PC. Audio and text never leave the machine. Best for environments that mandate offline-only processing. No medical vocabulary built in.
- **Windows / Microsoft 365 Dictation.** Cloud, processed in the Microsoft 365 tenant your organisation is subscribed to. Tenancy region depends on your M365 setup. General vocabulary only, no medical specialties.
- **AI scribe tools (Heidi, Lyrebird, etc.).** Cloud, vendor-specific data handling. Generative AI means output is not a verbatim record of what was said. Different regulatory considerations apply.

## Questions an IT or compliance team will ask

If you're putting Dragon Medical One in front of a hospital infosec review or a practice manager evaluating procurement, expect questions like the ones below. We'll walk you through the answers and provide written documentation for procurement files where needed.

- Where is audio processed?
- Where is the user profile stored?
- What happens to the audio after recognition?
- Which encryption standards apply in transit and at rest?
- Which compliance certifications apply to the underlying infrastructure?
- Is there a contractual data processing agreement available?
- How are user accounts provisioned and deprovisioned?
- Can administrators audit usage?
- Does Dragon Medical One create a patient record or feed into one?
- What's the disaster recovery posture between the two Australian Azure regions?

## Common questions

### Is Dragon Medical One hosted in Australia?

Yes. Subscriptions sold by Voice Recognition Australia are provisioned on the Australian Microsoft Azure tenant, with two geographically distributed Australian Azure regions providing resilience. Audio is processed in Australia, not the US or EU.

### Is Dragon Medical One HIPAA-compliant?

HIPAA is a US regulation and does not apply directly in Australia. In the US, Dragon Medical One is positioned by Microsoft as HIPAA-aligned. For Australian healthcare buyers, the relevant frameworks are the Privacy Act 1988, Australian Privacy Principles, and any state-specific health-records legislation. The underlying Azure platform is HITRUST CSF certified and ISO 27001 certified, which Australian compliance teams typically accept as evidence of mature security controls. Discuss specific compliance requirements with your privacy or compliance officer during evaluation.

### Is the audio recording stored after Dragon Medical One transcribes it?

The audio is streamed to the cloud for recognition processing and is not retained on the client device. Server-side retention is governed by current Microsoft/Nuance policies, which can change. Request current data handling specifics in writing as part of your procurement process if this matters for your compliance posture.

### What encryption does Dragon Medical One use?

Traffic between the client and the cloud uses TLS 1.2 with AES-256. Data at rest on Azure storage uses AES-256. These are the encryption standards Microsoft documents for Azure healthcare workloads.

### Can our hospital IT team manage Dragon Medical One centrally?

Yes. The Nuance Management Center (NMC) gives hospital IT teams a single console to manage user accounts, speech profiles, shared AutoText, shared vocabulary, and usage analytics across the organisation. Voice Recognition Australia configures NMC as part of enterprise deployments.

### How does this compare to keeping dictation offline with Dragon Professional 16?

[Dragon Professional 16](https://www.dragonprofessional16.com.au) processes everything locally on the clinician's Windows PC, so audio and text never leave the machine. It works fully offline after activation. The trade-off is that it has no medical specialty vocabularies, no PowerMic Mobile, no centralised management, and no automatic updates. If offline-only processing is a contractual or compliance requirement, Dragon Professional 16 is the right choice; if not, Dragon Medical One is built for clinical work and the security posture is appropriate for most Australian healthcare environments.

### Who do I contact about a security review?

Contact Voice Recognition Australia through our [contact form](/#final-cta). We provide current Microsoft and Nuance compliance documentation, can arrange direct contact with Microsoft healthcare cloud specialists for hospital-scale deployments, and can answer practical implementation questions about your specific environment.
