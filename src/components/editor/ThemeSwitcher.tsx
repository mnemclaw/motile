import { motion } from 'framer-motion';
import { usePageStore } from '../../store/pageStore';
import type { ThemeName } from '../../types/config';

const THEMES: { name: ThemeName; label: string; bg: string; text: string; accent: string }[] = [
  { name: 'minimal', label: 'Minimal', bg: '#ffffff', text: '#111827', accent: '#6366f1' },
  { name: 'glass', label: 'Glass', bg: 'linear-gradient(135deg, #1a1a2e, #0f3460)', text: '#ffffff', accent: '#06b6d4' },
  { name: 'neon', label: 'Neon', bg: '#0a0a0f', text: '#00ff88', accent: '#00ff88' },
  { name: 'retro', label: 'Retro', bg: '#fff9f0', text: '#1a1a1a', accent: '#ff6b6b' },
  { name: 'dark-elegance', label: 'Elegance', bg: '#1a1a1a', text: '#f5f5f5', accent: '#d4af37' },
  { name: 'gradient', label: 'Gradient', bg: 'linear-gradient(135deg, #667eea, #764ba2)', text: '#ffffff', accent: '#fbbf24' },
];

export function ThemeSwitcher() {
  const config = usePageStore((s) => s.config);
  const updateTheme = usePageStore((s) => s.updateTheme);
  const currentTheme = config?.page.theme;

  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Theme
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
        {THEMES.map((theme) => (
          <motion.button
            key={theme.name}
            onClick={() => updateTheme(theme.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: 'var(--space-2)',
              border: currentTheme === theme.name ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              transition: 'border-color var(--transition-fast)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 32,
                borderRadius: 4,
                background: theme.bg,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 4,
                  left: 4,
                  right: 4,
                  height: 6,
                  borderRadius: 3,
                  background: theme.accent,
                  opacity: 0.8,
                }}
              />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text)', fontWeight: currentTheme === theme.name ? 600 : 400 }}>
              {theme.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
