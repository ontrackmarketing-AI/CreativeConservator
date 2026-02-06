export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const mainNavLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export const footerServiceLinks: NavLink[] = [
  { label: 'Content Creation', href: '/services/content-creation' },
  { label: 'Content Strategy', href: '/services/content-strategy' },
  { label: 'Brand Strategy', href: '/services/brand-strategy' },
  { label: 'Social Media', href: '/services/social-media' },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/creativeconservator',
    icon: 'instagram',
  },
];

export const contactInfo = {
  email: 'Darya@creativeconservator.com',
  instagram: '@creativeconservator',
  instagramUrl: 'https://instagram.com/creativeconservator',
  responseTime: 'We typically respond within 24-48 hours.',
};

export const siteInfo = {
  name: 'The Creative Conservator',
  tagline: 'A modern creative marketing studio devoted to preserving the artistry at the heart of every brand.',
  copyright: `${new Date().getFullYear()} The Creative Conservator. All rights reserved.`,
  url: 'https://www.creativeconservator.com',
};
