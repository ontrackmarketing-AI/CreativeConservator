# Recommended URL Structure for The Creative Conservator

Based on competitor analysis and aligned with the pitch deck's service offerings.

**Domain:** www.creativeconservator.com
**Email:** Darya@creativeconservator.com
**Social:** @creativeconservator

---

## Primary Site Architecture

```
creativeconservator.com/
│
├── /                           # Homepage
├── /about                      # About/Story page (includes Founder, Values, Mission)
├── /services                   # Services overview
│   ├── /content-creation       # Photography, videography, social content
│   ├── /content-strategy       # Framework for brand communication
│   ├── /brand-strategy         # Brand identity, voice, values, positioning
│   ├── /identity-development   # Visual identity, logos, guidelines
│   ├── /social-media           # Social media management
│   ├── /marketing-campaigns    # Strategic campaign initiatives
│   └── /paid-advertising       # Meta, Google, TikTok ads
│
├── /work                       # Portfolio/Case studies
│   └── /[client-name]          # Individual case study
│
├── /journal                    # Blog/Insights (optional for Phase 2)
│   └── /[post-slug]            # Individual post
│
├── /contact                    # Contact page
│
└── /terms                      # Terms of service
```

---

## URL Best Practices Applied

### From Competitor Analysis:

| Practice | Source | Application |
|----------|--------|-------------|
| Clean slugs | All three | Use simple, hyphenated words |
| No trailing slashes | Seventh House | Keep URLs clean |
| Flat structure | Roy's, KSM | Most pages 1 level deep |
| Descriptive slugs | All three | URL describes page content |

---

## Navigation Structure

### Primary Navigation (Header)

| Menu Item | URL | Notes |
|-----------|-----|-------|
| Home | `/` | Logo links here |
| About | `/about` | Brand story |
| Services | `/services` | With dropdown |
| Work | `/work` | Portfolio |
| Journal | `/journal` | Blog/insights |
| Contact | `/contact` | Contact form |

### Services Dropdown (From Pitch Deck)

| Service | URL |
|---------|-----|
| Content Creation | `/services/content-creation` |
| Content Strategy | `/services/content-strategy` |
| Brand Strategy | `/services/brand-strategy` |
| Identity Development | `/services/identity-development` |
| Social Media Management | `/services/social-media` |
| Marketing Campaigns | `/services/marketing-campaigns` |
| Paid Advertising | `/services/paid-advertising` |

---

## Footer Navigation

### Column 1: Services
- Brand Strategy
- Identity Development
- Content Creation
- Social Media

### Column 2: Company
- About
- Work
- Journal
- Contact

### Column 3: Connect
- Instagram
- LinkedIn
- Email

### Column 4: Legal
- Terms of Service
- Privacy Policy

---

## Alternative URL Naming Options

### About Page
- `/about` ✓ (recommended - simple)
- `/story` (more creative)
- `/who-we-are` (longer but descriptive)

### Portfolio Page
- `/work` ✓ (recommended - concise)
- `/portfolio` (traditional)
- `/case-studies` (descriptive)

### Blog/Insights
- `/journal` ✓ (recommended - aligned with refined brand)
- `/blog` (common but generic)
- `/insights` (thought leadership feel)

### Contact
- `/contact` ✓ (recommended - standard)
- `/connect` (friendly)
- `/get-in-touch` (too long)

---

## Service URL Recommendations

### Option A: Nested under /services/ (Recommended)
```
/services/brand-strategy
/services/identity-development
/services/content-creation
```
**Pros:** Clear hierarchy, good for SEO
**Cons:** Slightly longer URLs

### Option B: Flat structure
```
/brand-strategy
/identity-development
/content-creation
```
**Pros:** Shorter URLs
**Cons:** Less organized

### Recommendation: Use Option A for clarity and SEO benefits

---

## Case Study/Portfolio URLs

### Structure:
```
/work/[client-name]
```

### Examples:
```
/work/luxe-beauty-brand
/work/artisan-bakery
/work/boutique-hotel
```

### Naming Guidelines:
- Use client name or project name
- Lowercase, hyphenated
- Keep under 3-4 words
- Avoid special characters

---

## Blog/Journal URLs

### Structure:
```
/journal/[post-slug]
```

### Examples:
```
/journal/power-of-brand-consistency
/journal/choosing-right-color-palette
/journal/social-media-strategy-2025
```

### Naming Guidelines:
- Descriptive but concise
- Include primary keyword
- No dates in URL (evergreen content)
- 3-6 words maximum

---

## Technical Considerations

### Redirects to Set Up
- `/home` → `/` (if platform creates /home)
- Any old URLs → new structure

### Canonical URLs
- Set canonical to non-www or www (pick one)
- HTTPS only

### Sitemap
- Generate XML sitemap
- Submit to Google Search Console
- Include all public pages

---

## Mobile Considerations

### URL Display
- Keep URLs short for mobile sharing
- Avoid special characters
- Test readability on small screens

---

## Future Expansion Paths

### Phase 2 Additions:
```
/resources                      # Free guides, templates
/newsletter                     # Newsletter signup/archive
```

### Phase 3 Additions:
```
/faq                           # Standalone FAQ page
/careers                       # If hiring
/partners                      # Collaborations
```

---

## Competitor Comparison Reference

| Page Type | Roy's Digital | KSM | Seventh House | Creative Conservator |
|-----------|--------------|-----|---------------|---------------------|
| Home | `/` | `/` | `/` | `/` |
| About | `/about` | `/about/` | `/about` | `/about` |
| Services | `/services` | `/services/` | `/services` | `/services` |
| Portfolio | (none) | (none) | `/portfolio` | `/work` |
| Blog | `/blog` | (none) | (none) | `/journal` |
| Contact | `/contact` | `/contact/` | `/contact-us` | `/contact` |
| Academy | (none) | (none) | `/academy` | (future: `/resources`) |
