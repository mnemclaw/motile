import { motion, AnimatePresence } from 'framer-motion';
import { usePageStore } from '../../store/pageStore';
import { useEditorStore } from '../../store/editorStore';
import { PageRenderer } from '../organisms/PageRenderer';
import { ThemeSwitcher } from './ThemeSwitcher';
import { BlockLibrary } from './BlockLibrary';
import { SectionsList } from './SectionsList';
import { PropertyInspector } from './PropertyInspector';
import { ExportButton } from './ExportButton';

export function EditorLayout() {
  const config = usePageStore((s) => s.config);
  const isEditorOpen = useEditorStore((s) => s.isEditorOpen);
  const setEditorOpen = useEditorStore((s) => s.setEditorOpen);

  if (!config) return <div style={{ color: 'var(--color-text-muted)', padding: 'var(--space-8)', textAlign: 'center' }}>Loading...</div>;

  return (
    <div
      data-theme="minimal"
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: '#f3f4f6',
        position: 'relative',
      }}
    >
      {/* Editor Panel */}
      <AnimatePresence initial={false}>
        {isEditorOpen && (
          <motion.div
            key="editor-panel"
            initial={{ x: -340, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -340, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: 320,
              flexShrink: 0,
              background: '#ffffff',
              borderRight: '1px solid rgba(0,0,0,0.08)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              padding: 'var(--space-6)',
              zIndex: 10,
            }}
          >
            <div>
              <h1 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--text-lg)', fontWeight: 700, color: '#111827' }}>
                motile
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
        )}
      </AnimatePresence>

      {/* Live Preview */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#e5e7eb',
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--space-8) var(--space-4)',
          position: 'relative',
        }}
      >
        {/* Toggle button */}
        <motion.button
          onClick={() => setEditorOpen(!isEditorOpen)}
          title={isEditorOpen ? 'Hide editor' : 'Show editor'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: isEditorOpen ? 320 : 0,
            transform: 'translateY(-50%)',
            zIndex: 20,
            background: '#111827',
            color: '#ffffff',
            border: 'none',
            borderRadius: isEditorOpen ? '0 8px 8px 0' : '0 8px 8px 0',
            width: 28,
            height: 56,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
            transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {isEditorOpen ? '◀' : '▶'}
        </motion.button>

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
