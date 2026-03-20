import { usePageStore } from '../../store/pageStore';
import { useEditorStore } from '../../store/editorStore';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--space-2) var(--space-3)',
  background: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-text)',
  fontSize: 'var(--text-sm)',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 600,
  color: 'var(--color-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 'var(--space-1)',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3)',
};

export function PropertyInspector() {
  const config = usePageStore((s) => s.config);
  const updateSection = usePageStore((s) => s.updateSection);
  const selectedId = useEditorStore((s) => s.selectedSectionId);
  const deselectSection = useEditorStore((s) => s.deselectSection);

  if (!selectedId || !config) {
    return (
      <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', textAlign: 'center', padding: 'var(--space-4)' }}>
        Select a section to edit its properties
      </div>
    );
  }

  const section = config.sections.find((s) => s.id === selectedId);
  if (!section) return null;

  const update = (key: string, value: unknown) => updateSection(selectedId, { [key]: value });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {section.type} Properties
        </div>
        <button onClick={deselectSection} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '1rem' }}>×</button>
      </div>

      {section.type === 'hero' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle} value={section.props.name} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Bio</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={section.props.bio} onChange={(e) => update('bio', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Avatar URL</label>
            <input style={inputStyle} value={section.props.avatar} onChange={(e) => update('avatar', e.target.value)} placeholder="https://..." />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>CTA Label</label>
            <input style={inputStyle} value={section.props.ctaLabel || ''} onChange={(e) => update('ctaLabel', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>CTA Link</label>
            <input style={inputStyle} value={section.props.ctaHref || ''} onChange={(e) => update('ctaHref', e.target.value)} placeholder="https://..." />
          </div>
        </>
      )}

      {section.type === 'link' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Icon (emoji)</label>
            <input style={inputStyle} value={section.props.icon || ''} onChange={(e) => update('icon', e.target.value)} placeholder="🔗" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Label</label>
            <input style={inputStyle} value={section.props.label} onChange={(e) => update('label', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>URL</label>
            <input style={inputStyle} value={section.props.href} onChange={(e) => update('href', e.target.value)} placeholder="https://..." />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={section.props.description || ''} onChange={(e) => update('description', e.target.value)} />
          </div>
        </>
      )}

      {section.type === 'media' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>YouTube or Vimeo URL</label>
            <input style={inputStyle} value={section.props.url} onChange={(e) => update('url', e.target.value)} placeholder="https://youtube.com/watch?v=..." />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={section.props.title || ''} onChange={(e) => update('title', e.target.value)} />
          </div>
        </>
      )}

      {section.type === 'cta' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Headline</label>
            <input style={inputStyle} value={section.props.headline} onChange={(e) => update('headline', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Subtext</label>
            <textarea style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} value={section.props.subtext || ''} onChange={(e) => update('subtext', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Button Label</label>
            <input style={inputStyle} value={section.props.buttonLabel} onChange={(e) => update('buttonLabel', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Button URL</label>
            <input style={inputStyle} value={section.props.buttonHref} onChange={(e) => update('buttonHref', e.target.value)} placeholder="https://..." />
          </div>
        </>
      )}

      {section.type === 'text' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Content (Markdown)</label>
            <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical', fontFamily: 'monospace' }} value={section.props.content} onChange={(e) => update('content', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Alignment</label>
            <select style={inputStyle} value={section.props.align || 'left'} onChange={(e) => update('align', e.target.value)}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </>
      )}

      {section.type === 'form' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={section.props.title || ''} onChange={(e) => update('title', e.target.value)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Placeholder</label>
            <input style={inputStyle} value={section.props.placeholder || ''} onChange={(e) => update('placeholder', e.target.value)} placeholder="Enter your email" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Button Label</label>
            <input style={inputStyle} value={section.props.buttonLabel || ''} onChange={(e) => update('buttonLabel', e.target.value)} placeholder="Subscribe" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Success Message</label>
            <input style={inputStyle} value={section.props.successMessage || ''} onChange={(e) => update('successMessage', e.target.value)} />
          </div>
        </>
      )}

      {(section.type === 'social' || section.type === 'link-grid') && (
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          Editing multiple items — support for this is coming in v2. Edit page.json directly for now.
        </div>
      )}
    </div>
  );
}
