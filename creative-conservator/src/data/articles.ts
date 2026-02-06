export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  imageAlt?: string;
  status: 'published' | 'coming-soon';
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: 'article-1',
    slug: 'power-of-brand-consistency',
    title: 'The Power of Brand Consistency',
    excerpt: 'Why protecting your brand\'s identity is the most strategic investment you can make.',
    category: 'Brand Strategy',
    date: '2026-01-15',
    status: 'coming-soon',
    featured: true,
  },
  {
    id: 'article-2',
    slug: 'content-strategy-vs-content-creation',
    title: 'Content Strategy vs. Content Creation: Understanding the Difference',
    excerpt: 'Clarity on the intentional framework that defines your communication versus the creative execution that brings it to life.',
    category: 'Content Strategy',
    date: '2026-01-10',
    status: 'coming-soon',
  },
  {
    id: 'article-3',
    slug: 'building-visual-identity-that-resonates',
    title: 'Building a Visual Identity That Resonates',
    excerpt: 'How to shape the visual and creative elements that define how your brand looks, feels, and communicates across every touchpoint.',
    category: 'Identity Development',
    date: '2026-01-05',
    status: 'coming-soon',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find(article => article.featured);
}

export function getPublishedArticles(): Article[] {
  return articles.filter(article => article.status === 'published');
}
