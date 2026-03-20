import { motion } from 'framer-motion';
import type { HeroProps } from '../../types/config';

interface HeroSectionProps extends HeroProps {
  index?: number;
}

export function HeroSection({ name, bio, avatar, ctaLabel, ctaHref, index = 0 }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)' }}
    >
      {avatar && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto var(--space-4)',
            border: '3px solid var(--color-primary)',
            boxShadow: 'var(--glow-primary)',
          }}
        >
          <img
            src={avatar}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      )}
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 var(--space-3)',
        }}
      >
        {name}
      </h1>
      <p
        style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-muted)',
          maxWidth: 480,
          margin: '0 auto var(--space-6)',
          lineHeight: 1.6,
        }}
      >
        {bio}
      </p>
      {ctaLabel && ctaHref && (
        <motion.a
          href={ctaHref}
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
          {ctaLabel}
        </motion.a>
      )}
    </motion.section>
  );
}
