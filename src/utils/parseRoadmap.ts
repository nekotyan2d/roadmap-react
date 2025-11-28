export function parseRoadmap(content: string) {
    return Object.values(JSON.parse(content) as RoadmapItem[]).map((item, index) => ({
        ...item,
        state: item.state !== undefined ? item.state : "not-started",
        id: item.id !== undefined ? item.id : index,
    }));
}
