import { motion } from 'framer-motion';
import type { CTAProps } from '../../types/config';

interface CTABlockProps extends CTAProps {
  index?: number;
}

export function CTABlock({ headline, subtext, buttonLabel, buttonHref, index = 0 }: CTABlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        background: 'var(--color-surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-8)',
        textAlign: 'center',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 var(--space-3)',
        }}
      >
        {headline}
      </h2>
      {subtext && (
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-muted)',
            margin: '0 0 var(--space-6)',
            lineHeight: 1.6,
          }}
        >
          {subtext}
        </p>
      )}
      <motion.a
        href={buttonHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-block',
          padding: 'var(--space-3) var(--space-8)',
          background: 'var(--color-primary)',
          color: '#ffffff',
          borderRadius: 'var(--radius-full)',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          boxShadow: 'var(--glow-primary)',
        }}
      >
        {buttonLabel}
      </motion.a>
    </motion.div>
  );
}
