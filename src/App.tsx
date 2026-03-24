import { useEffect } from 'react';
import { usePageStore } from './store/pageStore';
import { PageRenderer } from './components/organisms/PageRenderer';
import { EditorLayout } from './components/editor/EditorLayout';
import type { PageConfig } from './types/config';

export default function App() {
  const config = usePageStore((s) => s.config);
  const setConfig = usePageStore((s) => s.setConfig);

  // Load page.json on startup (only if no persisted config)
  useEffect(() => {
    if (!config) {
      fetch(`${import.meta.env.BASE_URL}page.json`)
        .then((r) => r.json())
        .then((data: PageConfig) => setConfig(data))
        .catch(console.error);
    }
  }, [config, setConfig]);

  if (!config) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f9fafb' }}>
        <div style={{ color: '#6b7280' }}>Loading...</div>
      </div>
    );
  }

  // Route: /edit → editor, everything else → public page
  // Use endsWith to work under any base path (dev: /edit, prod: /motile/edit)
  const isEditor = window.location.pathname.endsWith('/edit');

  if (isEditor) {
    return <EditorLayout />;
  }

  return <PageRenderer config={config} />;
}
