import { motion } from 'framer-motion';
import type { SocialProps } from '../../types/config';

interface SocialLinksProps extends SocialProps {
  index?: number;
}

export function SocialLinks({ links, index = 0 }: SocialLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
        justifyContent: 'center',
        padding: 'var(--space-4) 0',
      }}
    >
      {links.map((link, i) => (
        <motion.a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.platform}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-surface)',
            border: 'var(--border-card)',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-card)',
            textDecoration: 'none',
            color: 'var(--color-text)',
            backdropFilter: 'var(--backdrop-blur)',
            WebkitBackdropFilter: 'var(--backdrop-blur)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
          }}
        >
          {link.icon && (
            <span style={{ fontSize: '1.1rem' }} aria-hidden="true">
              {link.icon}
            </span>
          )}
          <span>{link.platform}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}
