import { AnimatePresence, motion } from 'framer-motion';
import { RollYourOwn } from '../atoms/RollYourOwn';
import { HeroSection } from '../molecules/HeroSection';
import { LinkBlock } from '../molecules/LinkBlock';
import { LinkGrid } from './LinkGrid';
import { SocialLinks } from '../molecules/SocialLinks';
import { MediaBlock } from '../molecules/MediaBlock';
import { CTABlock } from '../molecules/CTABlock';
import { TextBlock } from '../molecules/TextBlock';
import { FormBlock } from '../molecules/FormBlock';
import type { PageConfig, Section } from '../../types/config';

interface PageRendererProps {
  config: PageConfig;
}

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case 'hero':
      return <HeroSection key={section.id} {...section.props} index={index} />;
    case 'link':
      return <LinkBlock key={section.id} {...section.props} index={index} />;
    case 'link-grid':
      return <LinkGrid key={section.id} {...section.props} startIndex={index} />;
    case 'social':
      return <SocialLinks key={section.id} {...section.props} index={index} />;
    case 'media':
      return <MediaBlock key={section.id} {...section.props} index={index} />;
    case 'cta':
      return <CTABlock key={section.id} {...section.props} index={index} />;
    case 'text':
      return <TextBlock key={section.id} {...section.props} index={index} />;
    case 'form':
      return <FormBlock key={section.id} {...section.props} index={index} />;
    default:
      return null;
  }
}

export function PageRenderer({ config }: PageRendererProps) {
  const { page, sections } = config;

  // Apply theme tokens override as CSS custom properties
  const inlineStyle: React.CSSProperties = {};
  if (page.design?.tokensOverride) {
    Object.entries(page.design.tokensOverride).forEach(([key, value]) => {
      (inlineStyle as Record<string, string>)[key] = value;
    });
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={page.theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-theme={page.theme}
          style={{
            minHeight: '100vh',
            background: 'var(--color-bg)',
            ...inlineStyle,
          }}
        >
          <div
            style={{
              maxWidth: 640,
              margin: '0 auto',
              padding: '0 var(--space-4) var(--space-16)',
            }}
          >
            {sections.map((section, index) => renderSection(section, index))}
          </div>
        </motion.div>
      </AnimatePresence>
      <RollYourOwn />
    </>
  );
}
