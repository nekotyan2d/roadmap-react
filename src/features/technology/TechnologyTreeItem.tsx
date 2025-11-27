import { useAppStore } from "../../stores/app.js";
import "./TechnologyTreeItem.css";

interface TechnologyTreeItemProps {
    title: string;
    state: RoadmapState;
    id: number;
    onClick: () => void;
}

function TechnologyTreeItem({ title, state, id, onClick }: TechnologyTreeItemProps) {
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    return (
        <>
            <div
                className={`tech-tree-item tech-tree-item--${state}`}
                onClick={onClick}>
                <h3>{title}</h3>
            </div>
        </>
    );
}

export default TechnologyTreeItem;
