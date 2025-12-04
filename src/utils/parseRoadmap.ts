export function parseRoadmap(content: string) {
    return Object.values(JSON.parse(content) as RoadmapItem[]).map((item, index) => ({
        ...item,
        state: item.state !== undefined ? item.state : "not-started",
        id: item.id !== undefined ? item.id : index,
        note: item.note !== undefined ? item.note : "",
        deadline: item.deadline !== undefined && item.deadline !== null ? new Date(item.deadline) : null,
    }));
}
