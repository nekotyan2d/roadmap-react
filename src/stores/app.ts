import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
    roadmap: RoadmapItem[];
    setRoadmap: (data: RoadmapItem[]) => void;
    setRoadmapStateByIndex: (index: number, newState: RoadmapState) => void;
    setRoadmapNoteByIndex: (index: number, note: string) => void;
    setRoadmapDeadlineByIndex: (index: number, deadline: Date | null) => void;
    roadmapItemId: number | null;
    getCurrentRoadmapItem: () => RoadmapItem | undefined;
    setRoadmapItemId: (id: number | null) => void;

    filteredRoadmap: RoadmapItem[];
    setFilteredRoadmap: (data: RoadmapItem[]) => void;
    isFiltered: boolean;
    disableFiltering: () => void;
    search: (text: string) => void;
    filterByState: (state: RoadmapState | "all") => void;

    markAllAsCompleted: () => void;
    markAllAsNotStarted: () => void;

    selectedItems: number[];
    setSelectedItems: (ids: number[]) => void;
    clearSelectedItems: () => void;

    resetStore: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            roadmap: [],
            setRoadmap: (data) => set({ roadmap: data }),
            setRoadmapStateByIndex: (index, newState) =>
                set((state) => {
                    const updatedRoadmap = state.roadmap.map((item, i) =>
                        i === index ? { ...item, state: newState } : item
                    );
                    return { roadmap: updatedRoadmap };
                }),
            setRoadmapNoteByIndex: (index, note) =>
                set((state) => {
                    const updatedRoadmap = state.roadmap.map((item, i) => (i === index ? { ...item, note } : item));
                    return { roadmap: updatedRoadmap };
                }),
            setRoadmapDeadlineByIndex: (index, deadline) =>
                set((state) => {
                    const updatedRoadmap = state.roadmap.map((item, i) => (i === index ? { ...item, deadline } : item));
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
            search: (text: string) =>
                set((state) => {
                    const normalizedText = text.trim().toLowerCase();
                    if (normalizedText.length == 0) {
                        return { isFiltered: false, filteredRoadmap: [] };
                    }
                    return {
                        isFiltered: true,
                        filteredRoadmap: state.roadmap.filter(
                            (item) =>
                                item.title.toLowerCase().includes(normalizedText) ||
                                item.description.toLowerCase().includes(normalizedText)
                        ),
                    };
                }),
            filterByState: (_state) => {
                set((state) => {
                    if (_state === "all") {
                        return {
                            isFiltered: false,
                            filteredRoadmap: [],
                        };
                    }
                    return {
                        isFiltered: true,
                        filteredRoadmap: state.roadmap.filter((item) => item.state === _state),
                    };
                });
            },
            markAllAsCompleted: () => {
                set((state: AppState) => {
                    const updatedRoadmap = state.roadmap.map((item: RoadmapItem) => ({
                        ...item,
                        state: "completed" as RoadmapState,
                    }));
                    return { roadmap: updatedRoadmap };
                });
            },
            markAllAsNotStarted: () => {
                set((state: AppState) => {
                    const updatedRoadmap = state.roadmap.map((item: RoadmapItem) => ({
                        ...item,
                        state: "not-started" as RoadmapState,
                    }));
                    return { roadmap: updatedRoadmap };
                });
            },

            selectedItems: [],
            setSelectedItems: (ids) => set({ selectedItems: ids }),
            clearSelectedItems: () => set({ selectedItems: [] }),

            resetStore: () => set({ roadmap: [], filteredRoadmap: [], isFiltered: false, roadmapItemId: null }),
        }),
        {
            name: "app-store",
            partialize: (state) => ({ roadmap: state.roadmap }),
        }
    )
);
