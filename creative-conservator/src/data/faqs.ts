export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const contactFaqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What types of brands do you work with?',
    answer: 'We partner with experience-driven brands—those who understand that their identity is something to be protected and elevated, not just marketed. Our clients value artistry, intention, and long-term brand coherence over reactive, trend-chasing content. We work best with brands in lifestyle, hospitality, fashion, beauty, and creative industries who are ready to evolve with intention.',
  },
  {
    id: 'faq-2',
    question: 'What does "conserve" mean in your approach?',
    answer: 'To conserve is to preserve the essence of creative expression—protecting its meaning, artistry, and identity while shaping its evolution with intention. We don\'t just create content; we protect what makes your brand distinct while helping it grow. This philosophy guides everything we do.',
  },
  {
    id: 'faq-3',
    question: 'How does your process work?',
    answer: 'Our process follows four intentional stages: Discovery (we discuss your needs), Proposal (we present the plan for approval), Onboarding (we establish workflows and partnership foundation), and Strategize & Execute (we implement with discipline and intention, protecting brand coherence while driving measurable growth).',
  },
  {
    id: 'faq-4',
    question: 'What services do you offer?',
    answer: 'We offer seven core services: Content Creation, Content Strategy, Brand Strategy, Identity Development, Social Media Management, Marketing Campaigns, and Paid Advertising. Each service is designed to preserve and elevate your brand with intention.',
  },
  {
    id: 'faq-5',
    question: 'What makes The Creative Conservator different?',
    answer: 'We approach branding as something to be protected, not just promoted. While others focus on trends and reactive content, we provide clear, disciplined, and strategically guided creative work that eliminates reactive content, protects brand coherence, and supports long-term growth. Partnership, not production.',
  },
  {
    id: 'faq-6',
    question: 'What is Content Strategy vs. Content Creation?',
    answer: 'Content Strategy is the intentional framework—the "what," "why," and "how" of your brand\'s communication. Content Creation is the execution—producing the actual photography, videography, social media content, and storytelling. Strategy ensures every piece is purposeful; creation brings that purpose to life with clarity and artistry.',
  },
];

export const values = [
  {
    id: 'value-1',
    title: 'Intentional Creativity',
    description: 'Creativity is not decoration—it\'s a tool. Every visual, word, and concept exists for a reason and supports a defined objective.',
  },
  {
    id: 'value-2',
    title: 'Clarity',
    description: 'Clarity governs our approach to positioning, messaging, and intent. We lead with strategy, emphasizing disciplined execution and purposeful creative decisions.',
  },
  {
    id: 'value-3',
    title: 'Respect for Integrity',
    description: 'We treat brand identity as something to be protected, maintaining its integrity through consistency, long-term thinking, and the refusal of misaligned initiatives.',
  },
  {
    id: 'value-4',
    title: 'Evolution',
    description: 'Brands should evolve with intention, adapting and modernizing without compromising their core identity. Growth is guided by strategy, protecting what works while refining what does not.',
  },
  {
    id: 'value-5',
    title: 'Partnership',
    description: 'We work collaboratively and strategically with our clients. Our role extends beyond delivery, encompassing clear guidance, direct feedback, and shared accountability for results.',
  },
];

export const brandDefinition = {
  term: 'Conserve',
  pronunciation: '/ kən-ˈsərv /',
  partOfSpeech: '[verb]',
  meaning: 'To preserve the essence of creative expression—protecting its meaning, artistry, and identity while shaping its evolution with intention',
};

export const purpose = 'Our purpose is to preserve the essence of creative expression—protecting meaning, artistry, and identity—while guiding its evolution with intention, so experience-driven brands can grow without losing who they are.';

export const mission = 'Our mission is to help experience-driven brands preserve the integrity of their identity while evolving with intention. Through content strategy and content creation, we provide clear, disciplined, and strategically guided creative work that eliminates reactive content, protects brand coherence, and supports long-term growth through partnership, not production.';

export interface VisionItem {
  title: string;
  body: string;
  beliefs?: string[];
}

export const founderVision: VisionItem[] = [
  {
    title: 'Our Vision',
    body: 'Creative Conservator was built on the belief that brands are not experienced for the first time during a sales call — they are experienced long before that moment. In a world saturated with ads, noise, and short-term tactics, we exist to help experiential brands slow down, build trust, and communicate value through presence rather than pressure.',
  },
  {
    title: 'Why We Exist',
    body: 'We work with brands where the value isn\'t in the product alone — it\'s how it\'s felt. Hospitality, service-driven businesses, experience-led construction, wellness, and lifestyle-forward regulated brands require more than promotion. They require intention.',
  },
  {
    title: 'Our Approach',
    body: 'We don\'t chase trends or build campaigns that disappear after a click. We design brand experiences and content systems that build emotion, clarity, and connection — so trust is established before the first interaction.',
  },
  {
    title: 'Who We Partner With',
    body: 'Creative Conservator partners with brands that care about how they show up. Brands that understand reputation is built over time, not manufactured overnight.',
  },
  {
    title: 'What We Believe',
    body: '',
    beliefs: [
      'Trust is built before conversion',
      'Experience matters more than exposure',
      'Consistency creates credibility',
      'Presence outperforms promotion',
      'Long-term brands are built intentionally',
    ],
  },
  {
    title: 'Our Commitment',
    body: 'We commit to building brands that are felt, not forced — and experiences that last longer than any single campaign.',
  },
];

export const founderBio = {
  name: 'Darya',
  bio: 'Bringing a unique blend of marketing strategy, sales experience, and global perspective shaped by modeling and extensive international travel. With a strong eye for storytelling and brand presence, she focuses on creating campaigns that go beyond promotion—turning marketing into an experience brands feel, remember, and live through. She is currently studying digital marketing to continuously refine her craft in a fast-evolving industry.',
};
