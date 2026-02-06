export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'flowr-strain-experience',
    title: 'The FLOWR Strain Experience',
    description: 'A luxury cannabis brand campaign associating strains with Japanese cherry blossom varieties, using evocative imagery and sophisticated art direction.',
    category: 'Brand Campaign',
    tags: ['Art Direction', 'Brand Concept', 'Visual Storytelling'],
    image: '/images/portfolio/portfolio-kilian-perfume-hands-800.jpg',
    imageAlt: 'Luxury cannabis brand campaign with evocative imagery',
    featured: true,
  },
  {
    id: 'kilian-paris-editorial',
    title: 'Kilian Paris - Editorial Campaign',
    description: 'Luxury fragrance editorial capturing the sensory allure and refined essence of the Kilian Paris brand through evocative visual storytelling.',
    category: 'Editorial',
    tags: ['Content Creation', 'Creative Direction'],
    image: '/images/portfolio/portfolio-kilian-editorial-800.jpg',
    imageAlt: 'Kilian Paris luxury fragrance editorial photography',
  },
  {
    id: 'kilian-paris-product',
    title: 'Kilian Paris - Product Showcase',
    description: 'High-end product photography elevating the Kilian Paris collection through meticulous styling and refined visual composition.',
    category: 'Product',
    tags: ['Content Creation', 'Styling'],
    image: '/images/portfolio/portfolio-kilian-perfume-lips-800.jpg',
    imageAlt: 'Kilian Paris product photography with refined styling',
  },
  {
    id: 'fashion-editorial-sophisticated',
    title: 'Fashion Editorial - Sophisticated Style',
    description: 'Fashion editorial direction capturing elegance and modern sophistication through intentional styling and compelling visual narrative.',
    category: 'Fashion',
    tags: ['Content Creation', 'Art Direction'],
    image: '/images/portfolio/portfolio-fashion-editorial-duo-800.jpg',
    imageAlt: 'Fashion editorial with elegant styling and visual narrative',
  },
  {
    id: 'fashion-campaign-bold',
    title: 'Fashion Campaign - Bold Identity',
    description: 'Fashion campaign building a bold and distinctive brand identity through strategic visual direction and cohesive creative storytelling.',
    category: 'Campaign',
    tags: ['Brand Strategy', 'Content Creation'],
    image: '/images/portfolio/portfolio-fashion-back-to-back-800.jpg',
    imageAlt: 'Bold fashion campaign with distinctive brand identity',
    featured: true,
  },
  {
    id: 'lifestyle-editorial-luxury',
    title: 'Lifestyle Editorial - Refined Luxury',
    description: 'Lifestyle editorial bringing refined luxury to life through thoughtful creative direction, atmospheric photography, and intentional visual design.',
    category: 'Lifestyle',
    tags: ['Creative Direction', 'Photography'],
    image: '/images/portfolio/portfolio-luxury-lounge-800.jpg',
    imageAlt: 'Lifestyle editorial with refined luxury aesthetic',
  },
];

export const portfolioCategories = [
  'All',
  'Brand Campaign',
  'Editorial',
  'Product',
  'Fashion',
  'Campaign',
  'Lifestyle',
];

export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find(project => project.id === id);
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  if (category === 'All') return portfolioProjects;
  return portfolioProjects.filter(project => project.category === category);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter(project => project.featured);
}
