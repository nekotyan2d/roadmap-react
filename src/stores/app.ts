import { create } from "zustand";

interface AppState {
    roadmap: RoadmapItem[];
    setRoadmap: (data: RoadmapItem[]) => void;
    setRoadmapStateByIndex: (index: number, newState: RoadmapState) => void;
    roadmapItemId: number | null;
    getCurrentRoadmapItem: () => RoadmapItem | undefined;
    setRoadmapItemId: (id: number | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    roadmap: [],
    setRoadmap: (data) => set({ roadmap: data }),
    setRoadmapStateByIndex: (index, newState) =>
        set((state) => {
            const updatedRoadmap = state.roadmap.map((item, i) => (i === index ? { ...item, state: newState } : item));
            return { roadmap: updatedRoadmap };
        }),
    roadmapItemId: null,
    getCurrentRoadmapItem: () => {
        const id = get().roadmapItemId;
        return id !== null ? get().roadmap[id] : undefined;
    },
    setRoadmapItemId: (id) => set({ roadmapItemId: id }),
}));
