import { motion } from 'framer-motion';
import { usePageStore } from '../../store/pageStore';

export function ExportButton() {
  const config = usePageStore((s) => s.config);

  const handleExport = () => {
    if (!config) return;
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      onClick={handleExport}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        width: '100%',
        padding: 'var(--space-3)',
        background: 'var(--color-primary)',
        color: '#ffffff',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        fontSize: 'var(--text-sm)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
      }}
    >
      <span>↓</span> Export page.json
    </motion.button>
  );
}
