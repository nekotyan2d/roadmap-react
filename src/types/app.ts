declare global {
    type RoadmapState = "not-started" | "in-progress" | "completed";
    interface RoadmapLink {
        type: string;
        title: string;
        url: string;
    }

    interface RoadmapItem {
        title: string;
        description: string;
        links: RoadmapLink[];
        state: RoadmapState;
        note: string;
    }
}
