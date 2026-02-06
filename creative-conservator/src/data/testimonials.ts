export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorInitials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Working with The Creative Conservator transformed our brand presence. Their attention to detail and artistic vision exceeded our expectations.',
    authorName: 'Coming Soon',
    authorTitle: 'Client Testimonial',
    authorInitials: 'C',
  },
  {
    id: 'testimonial-2',
    quote: 'The strategic approach and creative execution helped us connect with our audience in ways we never imagined possible.',
    authorName: 'Coming Soon',
    authorTitle: 'Client Testimonial',
    authorInitials: 'C',
  },
  {
    id: 'testimonial-3',
    quote: 'Their dedication to preserving our brand\'s essence while pushing creative boundaries made all the difference in our campaign\'s success.',
    authorName: 'Coming Soon',
    authorTitle: 'Client Testimonial',
    authorInitials: 'C',
  },
];
