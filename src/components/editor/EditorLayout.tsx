import { motion } from 'framer-motion';
import { usePageStore } from '../../store/pageStore';
import { PageRenderer } from '../organisms/PageRenderer';
import { ThemeSwitcher } from './ThemeSwitcher';
import { BlockLibrary } from './BlockLibrary';
import { SectionsList } from './SectionsList';
import { PropertyInspector } from './PropertyInspector';
import { ExportButton } from './ExportButton';

export function EditorLayout() {
  const config = usePageStore((s) => s.config);

  if (!config) return <div style={{ color: 'var(--color-text-muted)', padding: 'var(--space-8)', textAlign: 'center' }}>Loading...</div>;

  return (
    <div
      data-theme="minimal"
      style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        height: '100vh',
        overflow: 'hidden',
        background: '#f3f4f6',
      }}
    >
      {/* Editor Panel */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          background: '#ffffff',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          padding: 'var(--space-6)',
        }}
      >
        <div>
          <h1 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--text-lg)', fontWeight: 700, color: '#111827' }}>
            mnem-linkpage
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: '#6b7280' }}>Visual Editor</p>
        </div>

        <ThemeSwitcher />
        <BlockLibrary />
        <SectionsList />
        <PropertyInspector />

        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <ExportButton />
        </div>
      </motion.div>

      {/* Live Preview */}
      <div
        style={{
          overflowY: 'auto',
          background: '#e5e7eb',
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--space-8) var(--space-4)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
          }}
        >
          <PageRenderer config={config} />
        </div>
      </div>
    </div>
  );
}
