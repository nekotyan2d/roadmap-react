import { create } from "zustand";

export const useAppStore = create((set, get) => ({
    roadmap: [],
    setRoadmap: (data) => set({ roadmap: data }),
    setRoadmapStateByIndex: (index, newState) =>
        set((state) => {
            const updatedRoadmap = state.roadmap.map((item, i) => (i === index ? { ...item, state: newState } : item));
            return { roadmap: updatedRoadmap };
        }),
    roadmapItemId: null,
    getCurrentRoadmapItem: () => get().roadmap[get().roadmapItemId],
    setRoadmapItemId: (id) => set({ roadmapItemId: id }),
}));
