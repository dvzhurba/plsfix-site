// Central site metadata. Fill the TODO links before launch (Appendix B of the PRD).
export const SITE = {
  name: 'Denis Zhurba',
  title: 'Denis Zhurba — Product leader, AI/ML at scale',
  description:
    'Denis Zhurba is a product leader building and scaling AI/ML products — communications systems at a 60M-user marketplace, smart-speaker products at VK, and BOXR, an AI sports-coaching app he founded and exited.',
  // TODO: confirm the public contact email and profile URLs before launch.
  email: 'hello@deniszhurba.com', // TODO
  profiles: {
    LinkedIn: 'https://www.linkedin.com/in/', // TODO
    GitHub: 'https://github.com/dvzhurba', // TODO confirm
    X: 'https://x.com/', // TODO
  },
};

export const NAV: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
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
