// Central site metadata. Fill the TODO links before launch (Appendix B of the PRD).
export const SITE = {
  name: 'Denis Zhurba',
  title: 'Denis Zhurba — Product leader, AI/ML & P&L at scale',
  description:
    'Denis Zhurba — product leader, AI/ML & P&L at scale. Consulting and strategy, then a hands-on consumer AI startup, now running product end-to-end at an international e-commerce platform.',
  email: 'info@plsfix.co.uk',
  profiles: {
    LinkedIn: 'https://www.linkedin.com/in/deniszhurba/',
    GitHub: 'https://github.com/dvzhurba',
  },
};

export const NAV: { label: string; href: string }[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'Talks', href: '/talks' },
  { label: 'Recognition', href: '/recognition' },
  { label: 'CV', href: '/cv' },
  { label: 'Contact', href: '/contact' },
];

// Prefix an internal path with the configured base (so links work on a
// custom domain at "/" or a project page at "/uk-global-talent").
export function withBase(href: string): string {
  if (!href || !href.startsWith('/')) return href;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + href;
}
