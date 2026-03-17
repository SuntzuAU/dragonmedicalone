# Interlink Rules - Cross-Site and Internal Linking

## Rules

- No footer links. Ever. All links contextual in body copy.
- Every blog post declares `internalLinks` and `externalLinks` in frontmatter
- Min 1 internal link, max 3
- Min 1 external link, max 2
- Never repeat same anchor text to same destination

## Before Writing Content

1. Read `src/data/link-network.json` for network config and anchor pools
2. Read `src/data/link-usage.json` for coverage counts and used anchors
3. Pick external target with lowest coverage count + relevant topic

## Blog Post Frontmatter

See BUILD-RULES.md for full frontmatter schema.

## Anchor Text Approval

Claude suggests 2-3 options, owner chooses. Never commit without approval.
