export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  included?: {
    title: string;
    description: string;
  }[];
  outcome?: string;
  metaDescription: string;
  twitterDescription: string;
}

export const services: Service[] = [
  {
    id: 'content-creation',
    slug: 'content-creation',
    title: 'Content Creation',
    shortDescription: 'Producing visual and digital assets that bring your brand\'s identity to life.',
    fullDescription: 'Content Creation is the process of producing the visual and digital assets that bring a brand\'s identity to life. This includes photography, videography, social media content, and written storytelling designed to communicate a brand\'s message with clarity and artistry. Through intentional creative direction, we craft content that reflects a brand\'s essence, engages its audience, and strengthens its presence across every platform.',
    icon: 'camera',
    metaDescription: 'Content Creation services by The Creative Conservator. Photography, videography, social media content, and written storytelling designed to bring your brand\'s identity to life.',
    twitterDescription: 'Photography, videography, social media content, and written storytelling to bring your brand to life.',
  },
  {
    id: 'content-strategy',
    slug: 'content-strategy',
    title: 'Content Strategy',
    shortDescription: 'The intentional framework that defines what you communicate and why.',
    fullDescription: 'Content Strategy is the intentional framework that defines what a brand communicates, why it matters, and how it supports long-term growth. It aligns messaging, visuals, and platforms with a brand\'s identity, audience, and objectives. Through insight, planning, and creative direction, content strategy ensures content is purposeful rather than reactive—guiding what is created, where it lives, and how it works together to build clarity, consistency, and meaningful connection over time.',
    icon: 'layers',
    included: [
      { title: 'Brand & Audience Analysis', description: 'Deep dive into brand identity, positioning, voice, values, and audience psychology' },
      { title: 'Content Architecture', description: 'Pillars, themes, messaging hierarchy, and narrative structure' },
      { title: 'Platform Strategy', description: 'Guidance on where to show up and how each channel functions strategically' },
      { title: 'Creative Direction', description: 'Visual language, tone, pacing, and aesthetic guardrails' },
      { title: 'Campaign & Editorial Planning', description: 'Intentional content planning tied to business goals (not trends)' },
      { title: 'Strategic Frameworks & Documentation', description: 'Playbooks, briefs, and guidelines that ensure consistency over time' },
    ],
    outcome: 'A clear, disciplined roadmap that prevents reactive content and protects brand integrity as you scale.',
    metaDescription: 'Content Strategy services by The Creative Conservator. An intentional framework that defines what your brand communicates, why it matters, and how it supports long-term growth.',
    twitterDescription: 'An intentional framework defining what your brand communicates and how it supports long-term growth.',
  },
  {
    id: 'brand-strategy',
    slug: 'brand-strategy',
    title: 'Brand Strategy',
    shortDescription: 'Clarifying who your brand is, what it stands for, and how it shows up.',
    fullDescription: 'Brand Strategy is the intentional framework that defines who a brand is, what it stands for, and how it shows up in the world. It clarifies a brand\'s identity, voice, values, audience, market position, and long-term vision. Through research, storytelling, and strategic planning, brand strategy shapes how a brand communicates, competes, and connects—ensuring every piece of content, every message, and every visual touchpoint works together to grow recognition, trust, and influence.',
    icon: 'stack',
    metaDescription: 'Brand Strategy services by The Creative Conservator. Clarifying who your brand is, what it stands for, and how it shows up in the world through research, storytelling, and strategic planning.',
    twitterDescription: 'Clarifying who your brand is and how it shows up in the world through research, storytelling, and planning.',
  },
  {
    id: 'identity-development',
    slug: 'identity-development',
    title: 'Identity Development',
    shortDescription: 'Shaping the visual elements that define how your brand looks and feels.',
    fullDescription: 'Identity Development is the process of shaping the visual and creative elements that define how a brand looks, feels, and communicates. This includes designing logos, selecting color palettes and typography, establishing visual guidelines, and creating an aesthetic framework that expresses the brand\'s personality and values. Through intentional design direction and cohesive visual storytelling, identity development transforms strategy into a distinctive, recognizable presence that resonates across every touchpoint.',
    icon: 'smile',
    metaDescription: 'Identity Development services by The Creative Conservator. Shaping the visual and creative elements that define how your brand looks, feels, and communicates across every touchpoint.',
    twitterDescription: 'Shaping the visual and creative elements that define how your brand looks, feels, and communicates.',
  },
  {
    id: 'social-media',
    slug: 'social-media',
    title: 'Social Media Management',
    shortDescription: 'Ongoing curation and oversight of your digital presence.',
    fullDescription: 'Social Media Management is the ongoing curation, creation, and oversight of a brand\'s presence across digital platforms. It includes planning and posting content, managing engagement, optimizing performance, and maintaining a consistent visual and strategic identity. Through intentional storytelling, community interaction, and data-driven refinement, social media management strengthens brand awareness, nurtures audience relationships, and supports measurable growth across every channel.',
    icon: 'monitor',
    metaDescription: 'Social Media Management services by The Creative Conservator. Ongoing curation, creation, and oversight of your brand\'s presence across digital platforms.',
    twitterDescription: 'Ongoing curation, creation, and oversight of your brand\'s presence across digital platforms.',
  },
  {
    id: 'marketing-campaigns',
    slug: 'marketing-campaigns',
    title: 'Marketing Campaigns',
    shortDescription: 'Strategic, goal-driven initiatives across targeted platforms.',
    fullDescription: 'Marketing Campaigns are strategic, goal-driven initiatives designed to promote a brand, product, or message across targeted platforms. They combine creative content, storytelling, and data-backed strategy to reach the right audience with intentional impact. Through coordinated visuals, messaging, and distribution, marketing campaigns increase visibility, drive engagement, and support measurable growth—turning brand objectives into results.',
    icon: 'checkCircle',
    metaDescription: 'Marketing Campaigns by The Creative Conservator. Strategic, goal-driven initiatives designed to promote your brand across targeted platforms with intentional impact.',
    twitterDescription: 'Strategic, goal-driven initiatives to promote your brand across targeted platforms with intentional impact.',
  },
  {
    id: 'paid-advertising',
    slug: 'paid-advertising',
    title: 'Paid Advertising',
    shortDescription: 'Data-driven ad placements on Meta, Google, TikTok, and more.',
    fullDescription: 'Paid Advertising uses targeted, data-driven ad placements to expand a brand\'s reach and deliver its message to the right audience at the right time. Through platforms like Meta, Google, TikTok, and others, paid advertising amplifies visibility, drives traffic, and accelerates results by promoting content beyond organic reach. This service includes ad strategy, audience targeting, creative development, campaign setup, monitoring, and optimization—ensuring every dollar spent supports measurable growth and clear business objectives.',
    icon: 'dollar',
    metaDescription: 'Paid Advertising services by The Creative Conservator. Targeted, data-driven ad placements on Meta, Google, TikTok, and more to expand your brand\'s reach and deliver measurable results.',
    twitterDescription: 'Targeted, data-driven ad placements on Meta, Google, TikTok, and more to deliver measurable results.',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your brand, goals, audience, and challenges through in-depth conversations and research.',
  },
  {
    number: '02',
    title: 'Proposal',
    description: 'Based on discovery insights, we craft a tailored proposal outlining scope, timeline, deliverables, and investment.',
  },
  {
    number: '03',
    title: 'Onboarding',
    description: 'Once aligned, we gather assets, establish communication channels, and set the foundation for a seamless collaboration.',
  },
  {
    number: '04',
    title: 'Strategize & Execute',
    description: 'We develop comprehensive strategies and bring them to life through intentional creative execution and ongoing refinement.',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getRelatedServices(currentSlug: string, count: number = 3): Service[] {
  return services.filter(service => service.slug !== currentSlug).slice(0, count);
}
