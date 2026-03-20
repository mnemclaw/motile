export type ThemeName = 'minimal' | 'glass' | 'neon' | 'retro' | 'dark-elegance' | 'gradient';

export interface PageMeta {
  description: string;
  image: string;
  favicon: string;
}

export interface PageDesign {
  tokensOverride?: Record<string, string>;
}

export interface PageInfo {
  title: string;
  slug: string;
  theme: ThemeName;
  metadata: PageMeta;
  design?: PageDesign;
}

export interface HeroProps {
  name: string;
  bio: string;
  avatar: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface LinkProps {
  href: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface LinkGridProps {
  links: LinkProps[];
  columns?: 1 | 2 | 3;
}

export interface MediaProps {
  url: string;
  title?: string;
  caption?: string;
}

export interface CTAProps {
  headline: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface TextProps {
  content: string;
  align?: 'left' | 'center' | 'right';
}

export interface FormProps {
  title?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon?: string;
}

export interface SocialProps {
  links: SocialLink[];
}

export type Section =
  | { id: string; type: 'hero'; props: HeroProps }
  | { id: string; type: 'link-grid'; props: LinkGridProps }
  | { id: string; type: 'link'; props: LinkProps }
  | { id: string; type: 'media'; props: MediaProps }
  | { id: string; type: 'cta'; props: CTAProps }
  | { id: string; type: 'text'; props: TextProps }
  | { id: string; type: 'form'; props: FormProps }
  | { id: string; type: 'social'; props: SocialProps };

export type SectionType = Section['type'];

export interface PageConfig {
  page: PageInfo;
  sections: Section[];
}
