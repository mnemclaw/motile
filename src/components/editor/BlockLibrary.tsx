import { motion } from 'framer-motion';
import { usePageStore } from '../../store/pageStore';
import type { Section, SectionType } from '../../types/config';

const BLOCK_TYPES: { type: SectionType; label: string; icon: string; description: string }[] = [
  { type: 'hero', label: 'Hero', icon: '👤', description: 'Avatar + bio' },
  { type: 'link', label: 'Link', icon: '🔗', description: 'Single link' },
  { type: 'link-grid', label: 'Link Grid', icon: '⊞', description: 'Grid of links' },
  { type: 'social', label: 'Social', icon: '💬', description: 'Social buttons' },
  { type: 'media', label: 'Video', icon: '▶', description: 'YouTube/Vimeo' },
  { type: 'cta', label: 'CTA', icon: '🎯', description: 'Call to action' },
  { type: 'text', label: 'Text', icon: '📝', description: 'Markdown text' },
  { type: 'form', label: 'Form', icon: '✉', description: 'Email signup' },
];

function createDefaultSection(type: SectionType): Section {
  const id = `${type}-${Date.now()}`;
  switch (type) {
    case 'hero':
      return { id, type, props: { name: 'Your Name', bio: 'Your bio here', avatar: '' } };
    case 'link':
      return { id, type, props: { href: 'https://', label: 'My Link', icon: '🔗' } };
    case 'link-grid':
      return { id, type, props: { links: [{ href: 'https://', label: 'Link 1', icon: '🔗' }], columns: 1 } };
    case 'social':
      return { id, type, props: { links: [{ platform: 'GitHub', href: 'https://github.com/', icon: '🐙' }] } };
    case 'media':
      return { id, type, props: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'My Video' } };
    case 'cta':
      return { id, type, props: { headline: 'Ready to connect?', buttonLabel: 'Get in touch', buttonHref: 'mailto:' } };
    case 'text':
      return { id, type, props: { content: 'Add your text here. **Markdown** supported!', align: 'left' } };
    case 'form':
      return { id, type, props: { title: 'Stay updated', buttonLabel: 'Subscribe' } };
  }
}

export function BlockLibrary() {
  const addSection = usePageStore((s) => s.addSection);

  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Add Block
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
        {BLOCK_TYPES.map((block) => (
          <motion.button
            key={block.type}
            onClick={() => addSection(createDefaultSection(block.type))}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{block.icon}</span>
            <div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{block.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{block.description}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
