import { useAppStore } from "../../stores/app.js";
import "./TechnologyTreeItem.css";

interface TechnologyTreeItemProps {
    title: string;
    state: RoadmapState;
    deadline: Date | null;
    id: number;
    onClick: () => void;
}

function TechnologyTreeItem({ title, state, deadline, id, onClick }: TechnologyTreeItemProps) {
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);
    const originalRoadmap = useAppStore((state) => state.roadmap);
    const filteredRoadmap = useAppStore((state) => state.filteredRoadmap);
    const roadmapIsFiltered = useAppStore((state) => state.isFiltered);

    const roadmap = roadmapIsFiltered ? filteredRoadmap : originalRoadmap;

    return (
        <>
            <div
                className={`tech-tree-item tech-tree-item--${state}`}
                id={`tech-item-${id}`}
                onClick={onClick}>
                <div className="bubble-title">
                    <h3>{title}</h3>
                </div>
                {!(roadmap.at(-1)?.id == id) && <div className="path"></div>}

                {deadline && state != "completed" && (
                    <div className="bubble-deadline">
                        {deadline.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                    </div>
                )}
            </div>
        </>
    );
}

export default TechnologyTreeItem;
