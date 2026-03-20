import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PageConfig, Section, ThemeName } from '../types/config';

interface PageStore {
  config: PageConfig | null;
  setConfig: (config: PageConfig) => void;
  updateSection: (id: string, props: Record<string, unknown>) => void;
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  updateTheme: (theme: ThemeName) => void;
  reorderSections: (sections: Section[]) => void;
}

export const usePageStore = create<PageStore>()(
  persist(
    (set) => ({
      config: null,

      setConfig: (config) => set({ config }),

      updateSection: (id, props) =>
        set((state) => {
          if (!state.config) return state;
          const sections = state.config.sections.map((s) => {
            if (s.id !== id) return s;
            return { ...s, props: { ...s.props, ...props } } as typeof s;
          });
          return {
            config: {
              ...state.config,
              sections,
            },
          };
        }),

      addSection: (section) =>
        set((state) => {
          if (!state.config) return state;
          return {
            config: {
              ...state.config,
              sections: [...state.config.sections, section],
            },
          };
        }),

      removeSection: (id) =>
        set((state) => {
          if (!state.config) return state;
          return {
            config: {
              ...state.config,
              sections: state.config.sections.filter((s) => s.id !== id),
            },
          };
        }),

      moveSection: (fromIndex, toIndex) =>
        set((state) => {
          if (!state.config) return state;
          const sections = [...state.config.sections];
          const [moved] = sections.splice(fromIndex, 1);
          sections.splice(toIndex, 0, moved);
          return { config: { ...state.config, sections } };
        }),

      reorderSections: (sections) =>
        set((state) => {
          if (!state.config) return state;
          return { config: { ...state.config, sections } };
        }),

      updateTheme: (theme) =>
        set((state) => {
          if (!state.config) return state;
          return {
            config: {
              ...state.config,
              page: { ...state.config.page, theme },
            },
          };
        }),
    }),
    {
      name: 'mnem-page-config',
    }
  )
);
