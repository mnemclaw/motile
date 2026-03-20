import { create } from 'zustand';

interface EditorStore {
  selectedSectionId: string | null;
  isDirty: boolean;
  isEditorOpen: boolean;
  selectSection: (id: string) => void;
  deselectSection: () => void;
  markDirty: () => void;
  markClean: () => void;
  setEditorOpen: (open: boolean) => void;
}

export const useEditorStore = create<EditorStore>()((set) => ({
  selectedSectionId: null,
  isDirty: false,
  isEditorOpen: false,

  selectSection: (id) => set({ selectedSectionId: id }),
  deselectSection: () => set({ selectedSectionId: null }),
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
  setEditorOpen: (open) => set({ isEditorOpen: open }),
}));
