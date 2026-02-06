// ==========================================================================
// PRICING DATA — Service Packages, Add-Ons, and FAQs
// ==========================================================================

export interface PackageService {
  name: string;
  description?: string;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  type: 'one-time' | 'retainer';
  target: string;
  price: {
    min: number;
    max: number;
    suffix?: string; // e.g., "/month", "one-time"
    note?: string; // e.g., "+ ad spend"
  };
  services: PackageService[];
  deliverables: string[];
  timeline?: string; // For one-time projects
  commitment?: string; // For retainers
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
  fullDescription: string;
  relatedServices: string[];
  outcome: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: {
    min: number;
    max: number;
    suffix: string;
  };
}

export interface UpgradePath {
  from: string;
  to: string;
  message: string;
}

// ==========================================================================
// SERVICE PACKAGES — 4-Tier Hybrid Model
// ==========================================================================

export const packages: Package[] = [
  {
    id: 'spark',
    slug: 'spark',
    name: 'Spark',
    tagline: 'Entry Point',
    type: 'one-time',
    target: 'Solopreneurs, startups, and budget-conscious brands ready to establish their foundation',
    price: {
      min: 2500,
      max: 4000,
      suffix: 'one-time',
    },
    services: [
      { name: 'Brand Strategy Lite', description: 'Positioning statement, core values, audience definition' },
      { name: 'Mini Identity Package', description: 'Logo, color palette, 2 fonts, basic brand board' },
      { name: 'Social Media Templates', description: '3-5 templates for Instagram and stories' },
      { name: 'Brand Guidelines PDF', description: 'Condensed version for quick reference' },
    ],
    deliverables: [
      'Brand board',
      'Logo files (all formats)',
      'Template kit',
      '1-page brand guidelines',
    ],
    timeline: '2-3 weeks',
    ctaText: 'Start Your Brand',
    ctaHref: '/contact?package=spark',
    fullDescription: 'Spark is designed for entrepreneurs and early-stage businesses who need professional branding without a massive investment. This one-time project gives you the essential building blocks of a cohesive brand identity: a clear positioning statement, a polished logo, a curated color palette, and ready-to-use social templates. Perfect for those just starting out or pivoting their business, Spark provides everything you need to show up professionally and consistently from day one.',
    relatedServices: ['brand-strategy', 'identity-development', 'content-creation'],
    outcome: 'A polished brand foundation that lets you launch with confidence and attract your ideal clients from the start.',
  },
  {
    id: 'ignite',
    slug: 'ignite',
    name: 'Ignite',
    tagline: 'Foundation Builder',
    type: 'one-time',
    target: 'Small businesses ready to invest in proper branding and a comprehensive foundation',
    price: {
      min: 6000,
      max: 10000,
      suffix: 'one-time',
    },
    services: [
      { name: 'Full Brand Strategy', description: 'Positioning, voice, values, audience personas, competitive analysis' },
      { name: 'Complete Identity Development', description: 'Logo suite, color system, typography, visual guidelines' },
      { name: 'Content Strategy Framework', description: 'Content pillars, messaging hierarchy, tone guidelines' },
      { name: 'Starter Content Kit', description: '10+ social templates, email header, presentation template' },
      { name: 'Comprehensive Brand Guidelines', description: 'Full documentation of your brand system' },
    ],
    deliverables: [
      'Full brand book',
      'Logo suite (primary, secondary, marks)',
      'Social & presentation templates',
      'Strategy documents',
      'Brand guidelines document',
    ],
    timeline: '4-6 weeks',
    ctaText: 'Build Your Foundation',
    ctaHref: '/contact?package=ignite',
    fullDescription: 'Ignite is our comprehensive brand foundation package for businesses ready to invest in doing branding right. This one-time project delivers everything you need to build a cohesive, professional brand: deep strategic work including competitive analysis and audience personas, a complete visual identity system, content strategy frameworks, and extensive templates to maintain consistency. Ignite sets you up for long-term success with documentation and assets that will guide your brand for years to come.',
    relatedServices: ['brand-strategy', 'identity-development', 'content-strategy'],
    outcome: 'A complete brand system that positions you as a premium player in your market and provides the foundation for scalable growth.',
  },
  {
    id: 'amplify',
    slug: 'amplify',
    name: 'Amplify',
    tagline: 'Growth Partner',
    type: 'retainer',
    target: 'Brands with established foundations ready for ongoing growth and consistent presence',
    price: {
      min: 3000,
      max: 5000,
      suffix: '/month',
    },
    services: [
      { name: 'Social Media Management', description: '3 platforms, 12-16 posts per month' },
      { name: 'Content Creation', description: 'Photography and graphics for social content' },
      { name: 'Content Strategy', description: 'Monthly content calendar and editorial planning' },
      { name: 'Community Management', description: 'Engagement, DM responses, comment moderation' },
      { name: 'Performance Reports', description: 'Monthly analytics and insights' },
      { name: 'Strategy Calls', description: 'Bi-weekly 30-minute sessions' },
    ],
    deliverables: [
      'Monthly content calendar',
      '12-16 social posts',
      'Community engagement',
      'Monthly analytics report',
    ],
    commitment: '3-month minimum',
    isPopular: true,
    ctaText: 'Grow With Us',
    ctaHref: '/contact?package=amplify',
    fullDescription: 'Amplify is our most popular ongoing partnership for brands that have their foundation in place and are ready to grow. This monthly retainer provides consistent social media management, fresh content creation, and strategic guidance to build your audience and strengthen your presence. With dedicated community management and regular strategy calls, Amplify ensures your brand stays active, relevant, and engaging without you having to manage it all yourself. Requires existing brand guidelines (from Spark, Ignite, or equivalent).',
    relatedServices: ['social-media', 'content-creation', 'content-strategy'],
    outcome: 'A consistently growing social presence that builds audience trust, drives engagement, and frees you to focus on running your business.',
  },
  {
    id: 'elevate',
    slug: 'elevate',
    name: 'Elevate',
    tagline: 'Full-Service Partnership',
    type: 'retainer',
    target: 'Established brands scaling aggressively who need comprehensive creative partnership',
    price: {
      min: 7500,
      max: 12000,
      suffix: '/month',
      note: '+ ad spend',
    },
    services: [
      { name: 'Everything in Amplify', description: 'All Amplify services included' },
      { name: 'Marketing Campaign Development', description: '1-2 campaigns per quarter' },
      { name: 'Paid Advertising Management', description: 'Meta + Google ads management' },
      { name: 'Advanced Content Creation', description: 'Video content and professional shoots' },
      { name: 'Priority Support', description: 'Faster turnarounds and dedicated attention' },
      { name: 'Weekly Strategy Calls', description: '60-minute sessions each week' },
      { name: 'Quarterly Brand Audits', description: 'Regular refinement and optimization' },
      { name: 'Dedicated Account Manager', description: 'Your single point of contact' },
    ],
    deliverables: [
      'Full content management',
      'Campaign development & execution',
      'Paid ads setup & optimization',
      'Weekly performance reporting',
      'Quarterly brand audits',
    ],
    commitment: '6-month minimum',
    ctaText: 'Partner With Us',
    ctaHref: '/contact?package=elevate',
    fullDescription: 'Elevate is our premium full-service partnership for established brands ready to scale aggressively. This comprehensive monthly retainer includes everything in Amplify plus marketing campaign development, paid advertising management across Meta and Google, advanced video content creation, and dedicated priority support. With weekly strategy calls, quarterly brand audits, and a dedicated account manager, Elevate provides the high-touch creative partnership that scaling brands need to accelerate growth and maintain brand excellence.',
    relatedServices: ['marketing-campaigns', 'paid-advertising', 'social-media'],
    outcome: 'Accelerated growth through integrated marketing campaigns, optimized paid advertising, and a dedicated creative team focused entirely on your success.',
  },
];

// ==========================================================================
// ADD-ON SERVICES — A La Carte Options
// ==========================================================================

export const addOns: AddOn[] = [
  {
    id: 'additional-platform',
    name: 'Additional Social Platform',
    description: 'Extend your presence to another platform with full management',
    price: { min: 500, max: 800, suffix: '/month' },
  },
  {
    id: 'video-content',
    name: 'Video Content (Reels/TikTok)',
    description: 'Short-form video creation for social platforms',
    price: { min: 1000, max: 2000, suffix: '/month' },
  },
  {
    id: 'photo-shoot',
    name: 'Professional Photo Shoot',
    description: 'On-location or studio photography session',
    price: { min: 1500, max: 3000, suffix: '/session' },
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing Setup',
    description: 'Email templates, sequences, and platform setup',
    price: { min: 1500, max: 3000, suffix: 'one-time' },
  },
  {
    id: 'landing-page',
    name: 'Landing Page Design',
    description: 'Custom landing page design and development',
    price: { min: 1000, max: 2500, suffix: '/page' },
  },
  {
    id: 'paid-ads-standalone',
    name: 'Paid Ads (Standalone)',
    description: 'Ad management without a retainer package',
    price: { min: 1500, max: 3000, suffix: '/month + ad spend' },
  },
  {
    id: 'additional-campaign',
    name: 'Additional Campaign',
    description: 'Extra marketing campaign beyond package inclusions',
    price: { min: 2000, max: 4000, suffix: '/campaign' },
  },
];

// ==========================================================================
// UPGRADE PATHS
// ==========================================================================

export const upgradePaths: UpgradePath[] = [
  {
    from: 'spark',
    to: 'ignite',
    message: 'Ready for the full brand experience?',
  },
  {
    from: 'ignite',
    to: 'amplify',
    message: 'Your brand is built—now let\'s grow it.',
  },
  {
    from: 'amplify',
    to: 'elevate',
    message: 'Scale faster with campaigns & paid ads.',
  },
];

// ==========================================================================
// PRICING FAQs
// ==========================================================================

export interface PricingFAQ {
  id: string;
  question: string;
  answer: string;
}

export const pricingFaqs: PricingFAQ[] = [
  {
    id: 'pricing-faq-1',
    question: 'How do I know which package is right for me?',
    answer: 'Start by considering where you are in your brand journey. If you\'re just starting out and need basic branding, Spark provides an affordable foundation. If you\'re ready for a comprehensive brand system, Ignite is ideal. For ongoing growth and consistent social presence, Amplify is our most popular choice. And if you\'re scaling aggressively and need full-service support including paid advertising, Elevate is designed for you. Not sure? Book a discovery call and we\'ll help you decide.',
  },
  {
    id: 'pricing-faq-2',
    question: 'What are your payment terms?',
    answer: 'For one-time projects (Spark & Ignite), we require 50% upfront to begin work, with the remaining 50% due upon project completion. For retainer packages (Amplify & Elevate), payment is due at the beginning of each month. We accept bank transfers and all major credit cards.',
  },
  {
    id: 'pricing-faq-3',
    question: 'Why do retainer packages require a minimum commitment?',
    answer: 'Building momentum and seeing results from consistent content and strategy takes time. The 3-month minimum for Amplify and 6-month minimum for Elevate ensures we have adequate time to implement strategies, gather data, and optimize for your brand\'s growth. This commitment also allows us to dedicate resources and provide the best possible service.',
  },
  {
    id: 'pricing-faq-4',
    question: 'What happens to unused deliverables?',
    answer: 'For retainer packages, unused posts or content from a given month do not roll over to the next month. We recommend planning ahead to make the most of your package. However, if you\'re consistently not using all deliverables, we can discuss adjusting your package or reallocating resources to better serve your needs.',
  },
  {
    id: 'pricing-faq-5',
    question: 'Can I upgrade or downgrade my package?',
    answer: 'Yes, packages can be adjusted at the end of any commitment period. Upgrades can often be accommodated mid-cycle if capacity allows. Downgrades take effect at the end of your current commitment period. We\'ll work with you to find the right fit as your needs evolve.',
  },
  {
    id: 'pricing-faq-6',
    question: 'Do you offer custom packages?',
    answer: 'While our packages are designed to meet most needs, we understand every brand is unique. If none of our packages quite fit, book a discovery call and we\'ll discuss a custom solution. Add-on services can also be combined with any package to create a tailored approach.',
  },
  {
    id: 'pricing-faq-7',
    question: 'What\'s not included in the pricing?',
    answer: 'Package prices do not include third-party costs such as advertising spend, stock photography licenses, software subscriptions, or printing costs. For the Elevate package, ad spend is billed separately based on your budget and goals. We\'ll always be transparent about any additional costs before they\'re incurred.',
  },
  {
    id: 'pricing-faq-8',
    question: 'Do I need to complete Ignite before starting Amplify?',
    answer: 'Amplify works best for brands that already have established visual identity and brand guidelines. If you don\'t have these, we recommend starting with Spark or Ignite first to build your foundation. However, if you have existing brand assets from another designer or agency, we can review them to determine if you\'re ready for Amplify.',
  },
];

// ==========================================================================
// COMPARISON FEATURES — For Pricing Table
// ==========================================================================

export interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    spark: boolean | string;
    ignite: boolean | string;
    amplify: boolean | string;
    elevate: boolean | string;
  }[];
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    category: 'Brand Strategy',
    features: [
      { name: 'Positioning & Values', spark: 'Basic', ignite: 'Full', amplify: false, elevate: false },
      { name: 'Audience Personas', spark: false, ignite: true, amplify: false, elevate: false },
      { name: 'Competitive Analysis', spark: false, ignite: true, amplify: false, elevate: false },
    ],
  },
  {
    category: 'Identity Development',
    features: [
      { name: 'Logo Design', spark: 'Primary only', ignite: 'Full suite', amplify: false, elevate: false },
      { name: 'Color System', spark: true, ignite: true, amplify: false, elevate: false },
      { name: 'Typography', spark: '2 fonts', ignite: 'Full system', amplify: false, elevate: false },
      { name: 'Brand Guidelines', spark: '1-page', ignite: 'Comprehensive', amplify: false, elevate: false },
    ],
  },
  {
    category: 'Content Strategy',
    features: [
      { name: 'Content Pillars', spark: false, ignite: true, amplify: true, elevate: true },
      { name: 'Messaging Hierarchy', spark: false, ignite: true, amplify: true, elevate: true },
      { name: 'Monthly Content Calendar', spark: false, ignite: false, amplify: true, elevate: true },
      { name: 'Editorial Planning', spark: false, ignite: false, amplify: true, elevate: true },
    ],
  },
  {
    category: 'Content Creation',
    features: [
      { name: 'Social Templates', spark: '3-5', ignite: '10+', amplify: 'Monthly', elevate: 'Monthly' },
      { name: 'Graphics & Photography', spark: false, ignite: false, amplify: true, elevate: true },
      { name: 'Video Content', spark: false, ignite: false, amplify: false, elevate: true },
      { name: 'Professional Shoots', spark: false, ignite: false, amplify: false, elevate: 'Quarterly' },
    ],
  },
  {
    category: 'Social Media',
    features: [
      { name: 'Platform Management', spark: false, ignite: false, amplify: '3 platforms', elevate: '3+ platforms' },
      { name: 'Monthly Posts', spark: false, ignite: false, amplify: '12-16', elevate: '16+' },
      { name: 'Community Engagement', spark: false, ignite: false, amplify: true, elevate: true },
    ],
  },
  {
    category: 'Marketing & Advertising',
    features: [
      { name: 'Campaign Development', spark: false, ignite: false, amplify: false, elevate: '1-2/quarter' },
      { name: 'Paid Ads Management', spark: false, ignite: false, amplify: false, elevate: true },
    ],
  },
  {
    category: 'Support & Reporting',
    features: [
      { name: 'Strategy Calls', spark: false, ignite: false, amplify: 'Bi-weekly (30 min)', elevate: 'Weekly (60 min)' },
      { name: 'Performance Reports', spark: false, ignite: false, amplify: 'Monthly', elevate: 'Weekly' },
      { name: 'Priority Support', spark: false, ignite: false, amplify: false, elevate: true },
      { name: 'Dedicated Account Manager', spark: false, ignite: false, amplify: false, elevate: true },
      { name: 'Quarterly Brand Audits', spark: false, ignite: false, amplify: false, elevate: true },
    ],
  },
];

// ==========================================================================
// HELPER FUNCTIONS
// ==========================================================================

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find(pkg => pkg.slug === slug);
}

export function formatPrice(min: number, max: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (min === max) {
    return formatter.format(min);
  }
  return `${formatter.format(min)} – ${formatter.format(max)}`;
}

export function getUpgradePathFrom(packageId: string): UpgradePath | undefined {
  return upgradePaths.find(path => path.from === packageId);
}
