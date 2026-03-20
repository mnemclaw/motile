import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { usePageStore } from '../../store/pageStore';
import { useEditorStore } from '../../store/editorStore';

const SECTION_ICONS: Record<string, string> = {
  hero: '👤',
  link: '🔗',
  'link-grid': '⊞',
  social: '💬',
  media: '▶',
  cta: '🎯',
  text: '📝',
  form: '✉',
};

export function SectionsList() {
  const config = usePageStore((s) => s.config);
  const reorderSections = usePageStore((s) => s.reorderSections);
  const removeSection = usePageStore((s) => s.removeSection);
  const selectedSectionId = useEditorStore((s) => s.selectedSectionId);
  const selectSection = useEditorStore((s) => s.selectSection);
  const deselectSection = useEditorStore((s) => s.deselectSection);

  if (!config) return null;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sections = Array.from(config.sections);
    const [moved] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, moved);
    reorderSections(sections);
  };

  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Sections ({config.sections.length})
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
            >
              {config.sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(drag, snapshot) => (
                    <div
                      ref={drag.innerRef}
                      {...drag.draggableProps}
                      style={{
                        ...drag.draggableProps.style,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-2) var(--space-3)',
                        background: selectedSectionId === section.id ? 'var(--color-primary)' : snapshot.isDragging ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        opacity: snapshot.isDragging ? 0.8 : 1,
                      }}
                      onClick={() => {
                        if (selectedSectionId === section.id) deselectSection();
                        else selectSection(section.id);
                      }}
                    >
                      <span {...drag.dragHandleProps} style={{ cursor: 'grab', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>⠿</span>
                      <span style={{ fontSize: '1rem' }}>{SECTION_ICONS[section.type] || '□'}</span>
                      <span style={{ flex: 1, fontSize: 'var(--text-sm)', fontWeight: 500, color: selectedSectionId === section.id ? '#ffffff' : 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {section.type}
                      </span>
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); removeSection(section.id); if (selectedSectionId === section.id) deselectSection(); }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: selectedSectionId === section.id ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)', fontSize: '1rem', padding: 0, lineHeight: 1 }}
                        aria-label={`Delete ${section.type} section`}
                      >
                        ×
                      </motion.button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
