export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  headline: string;
  results: string[];
  image: string;
  imageAlt: string;
  href: string;
  heroImage: string;
  heroImageAlt: string;
  challenge: string;
  solution: string;
  approach: string[];
  servicesUsed: string[];
  gallery: { src: string; alt: string; caption?: string }[];
  metrics: { value: string; label: string }[];
  testimonial?: { quote: string; authorName: string; authorTitle: string };
  timeline?: string;
  year?: string;
  tags?: string[];
  clientLogo?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'decked-out-dezigns',
    slug: 'decked-out-dezigns',
    client: 'Decked Out Dezigns',
    industry: 'Custom Embroidery & Apparel',
    headline: 'Built a brand foundation, website, and global ordering system from the ground up with our Spark package.',
    results: [
      'Complete brand identity system with logo, color palette, and brand guidelines',
      'Custom e-commerce website with integrated global ordering capabilities',
      'Cohesive visual presence across digital and physical brand touchpoints',
    ],
    image: '/images/portfolio/decked-out-dezigns-logo.jpg',
    imageAlt: 'Decked Out Dezigns logo — DOD monogram with needle and thread',
    href: '/case-studies/',
    heroImage: '/images/portfolio/portfolio-fashion-back-to-back-1200.jpg',
    heroImageAlt: 'Decked Out Dezigns hero — two models showcasing custom embroidered apparel',
    challenge: 'Decked Out Dezigns had a loyal local following and years of custom embroidery expertise, but no cohesive brand identity to match their craft. Their visual presence was inconsistent across platforms, they had no website, and customers had to place orders through DMs and phone calls — a process that limited their reach and created friction for both the business and its clients.\n\nThey needed a complete brand overhaul: a professional identity system, a digital home, and a streamlined ordering experience that could scale beyond their local market. The challenge was translating a hands-on, relationship-driven business into a polished digital presence without losing the personal touch that made them special.',
    solution: 'We partnered with Decked Out Dezigns through our Spark package to build their brand from the ground up. Starting with deep discovery sessions, we uncovered the founder\'s vision, audience, and competitive landscape. From there, we developed a complete identity system — logo suite, color palette, typography, and brand guidelines — that captured the energy and craftsmanship behind every stitch.\n\nThe centerpiece was a custom e-commerce website with an integrated global ordering system, allowing customers to browse products, customize orders, and purchase from anywhere in the world. We art-directed a product photography suite that brought the brand to life online, and established a content strategy to drive consistent engagement across social channels.',
    approach: [
      'Conducted brand discovery workshops to define voice, values, and visual direction',
      'Designed a complete brand identity system including logo, color palette, and guidelines',
      'Built a custom e-commerce website with global ordering capabilities',
      'Art-directed product photography for digital and social channels',
      'Developed a content strategy and social media launch plan',
    ],
    servicesUsed: ['brand-strategy', 'identity-development', 'content-creation', 'content-strategy'],
    gallery: [
      { src: '/images/portfolio/portfolio-fashion-back-to-back-800.jpg', alt: 'Two models in custom embroidered apparel', caption: 'Brand campaign photography' },
      { src: '/images/portfolio/portfolio-fashion-editorial-duo-800.jpg', alt: 'Editorial fashion duo shot', caption: 'Editorial shoot for social media' },
      { src: '/images/portfolio/portfolio-fashion-elegant-room-800.jpg', alt: 'Elegant room fashion setting', caption: 'Lifestyle product photography' },
      { src: '/images/portfolio/portfolio-fashion-interior-800.jpg', alt: 'Interior fashion photography', caption: 'E-commerce product visuals' },
    ],
    metrics: [
      { value: '300%', label: 'Increase in Online Orders' },
      { value: '12K+', label: 'Social Followers in 90 Days' },
      { value: '45%', label: 'Repeat Customer Rate' },
    ],
    testimonial: {
      quote: 'The Creative Conservator didn\'t just give us a logo — they gave us a brand. For the first time, everything feels connected. Our customers notice the difference, and so do we.',
      authorName: 'Jordan Ellis',
      authorTitle: 'Founder, Decked Out Dezigns',
    },
    timeline: '8 weeks',
    year: '2024',
    tags: ['Branding', 'E-Commerce', 'Photography', 'Strategy'],
    clientLogo: '/images/portfolio/decked-out-dezigns-logo.jpg',
  },
  {
    id: 'luxe-botanica',
    slug: 'luxe-botanica',
    client: 'Luxe Botanica',
    industry: 'Luxury Skincare',
    headline: 'Elevated a boutique skincare line with editorial content strategy and refined visual storytelling.',
    results: [
      'Art-directed product photography suite for e-commerce and social channels',
      'Strategic content calendar driving a 3x increase in organic engagement',
      'Unified brand voice and visual language across all marketing materials',
    ],
    image: '/images/portfolio/portfolio-kilian-editorial-800.jpg',
    imageAlt: 'Luxe Botanica luxury skincare editorial photography',
    href: '/case-studies/',
    heroImage: '/images/portfolio/portfolio-kilian-editorial-1200.jpg',
    heroImageAlt: 'Luxe Botanica hero — luxury skincare editorial with warm tones',
    challenge: 'Luxe Botanica had an exceptional product line crafted from rare botanical ingredients, but their digital presence didn\'t reflect the luxury of their formulations. Their social media felt disjointed — a mix of iPhone photos, inconsistent captions, and no clear visual language. Despite a devoted customer base, they were invisible to the broader luxury skincare audience.\n\nThe brand needed to shift from DIY content to a curated, editorial-grade presence that could compete with established luxury competitors. They required a strategic content approach that would position them as a premium brand while driving measurable growth in engagement and reach.',
    solution: 'We developed a comprehensive content strategy anchored in editorial storytelling and refined visual direction. Beginning with a brand audit and competitive analysis, we identified whitespace in the luxury skincare content landscape and crafted a positioning strategy that leaned into Luxe Botanica\'s unique botanical heritage.\n\nOur team art-directed and produced a complete product photography suite — from moody editorial shots for brand campaigns to clean, detailed product imagery for e-commerce. We built a strategic content calendar with pillar themes, seasonal narratives, and engagement-driven formats. Every asset was designed to reinforce a cohesive visual language that signaled luxury, intention, and craftsmanship.',
    approach: [
      'Performed a comprehensive brand audit and competitive landscape analysis',
      'Defined a luxury-forward content strategy with pillar themes and editorial direction',
      'Art-directed and produced a full product photography suite',
      'Created a strategic content calendar with seasonal narratives',
      'Established brand voice guidelines and visual language standards',
    ],
    servicesUsed: ['content-strategy', 'content-creation', 'social-media', 'marketing-campaigns'],
    gallery: [
      { src: '/images/portfolio/portfolio-kilian-editorial-800.jpg', alt: 'Luxury skincare editorial photography', caption: 'Hero campaign imagery' },
      { src: '/images/portfolio/portfolio-kilian-perfume-hands-800.jpg', alt: 'Hands cradling luxury perfume bottle', caption: 'Product detail photography' },
      { src: '/images/portfolio/portfolio-kilian-perfume-lips-800.jpg', alt: 'Close-up beauty shot with perfume', caption: 'Social media content' },
      { src: '/images/portfolio/portfolio-luxury-lounge-800.jpg', alt: 'Luxury lounge setting', caption: 'Lifestyle brand photography' },
    ],
    metrics: [
      { value: '3x', label: 'Organic Engagement Growth' },
      { value: '180%', label: 'Website Traffic Increase' },
      { value: '67%', label: 'Higher Average Order Value' },
    ],
    testimonial: {
      quote: 'Working with The Creative Conservator transformed how our brand shows up. The photography alone changed everything — but the strategy behind it is what made it last. We finally look like the brand we always knew we were.',
      authorName: 'Camille Renard',
      authorTitle: 'Creative Director, Luxe Botanica',
    },
    timeline: '12 weeks',
    year: '2024',
    tags: ['Content Strategy', 'Photography', 'Social Media', 'Luxury'],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}

export function getNextCaseStudy(currentSlug: string): CaseStudy | undefined {
  const index = caseStudies.findIndex(cs => cs.slug === currentSlug);
  if (index === -1) return undefined;
  return caseStudies[(index + 1) % caseStudies.length];
}
