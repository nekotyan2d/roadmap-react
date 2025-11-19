declare global {
    type RoadmapState = "not-started" | "in-progress" | "completed";
    interface RoadmapLink {
        type: string;
        title: string;
        url: string;
    }

    interface RoadmapItem {
        id: number;
        title: string;
        description: string;
        links: RoadmapLink[];
        state: RoadmapState;
        note: string;
    }
}
