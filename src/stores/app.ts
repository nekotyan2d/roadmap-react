import { create } from "zustand";

interface AppState {
    roadmap: RoadmapItem[];
    setRoadmap: (data: RoadmapItem[]) => void;
    setRoadmapStateByIndex: (index: number, newState: RoadmapState) => void;
    setRoadmapNoteByIndex: (index: number, note: string) => void;
    roadmapItemId: number | null;
    getCurrentRoadmapItem: () => RoadmapItem | undefined;
    setRoadmapItemId: (id: number | null) => void;

    filteredRoadmap: RoadmapItem[];
    setFilteredRoadmap: (data: RoadmapItem[]) => void;
    isFiltered: boolean;
    disableFiltering: () => void;
    searchByTitle: (text: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    roadmap: [],
    setRoadmap: (data) => set({ roadmap: data }),
    setRoadmapStateByIndex: (index, newState) =>
        set((state) => {
            const updatedRoadmap = state.roadmap.map((item, i) => (i === index ? { ...item, state: newState } : item));
            return { roadmap: updatedRoadmap };
        }),
    setRoadmapNoteByIndex: (index, note) =>
        set((state) => {
            const updatedRoadmap = state.roadmap.map((item, i) => (i === index ? { ...item, note } : item));
            return { roadmap: updatedRoadmap };
        }),
    roadmapItemId: null,
    getCurrentRoadmapItem: () => {
        const id = get().roadmapItemId;
        return id !== null ? get().roadmap[id] : undefined;
    },
    setRoadmapItemId: (id) => set({ roadmapItemId: id }),

    filteredRoadmap: [],
    setFilteredRoadmap: (data) =>
        set((state) => {
            state.isFiltered = true;
            return { filteredRoadmap: data };
        }),
    disableFiltering: () =>
        set((state) => {
            return { isFiltered: false };
        }),
    isFiltered: false,
    searchByTitle: (text: string) =>
        set((state) => {
            const normalizedText = text.trim().toLowerCase();
            if (normalizedText.length == 0) {
                return { isFiltered: false, filteredRoadmap: [] };
            }
            return {
                isFiltered: true,
                filteredRoadmap: state.roadmap.filter((item) => item.title.toLowerCase().includes(normalizedText)),
            };
        }),
}));
