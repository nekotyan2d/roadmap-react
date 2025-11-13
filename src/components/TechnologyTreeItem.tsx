import { useAppStore } from "../stores/app.js";
import "./TechnologyTreeItem.css";

interface TechnologyTreeItemProps {
    title: string;
    state: RoadmapState;
    id: number;
}

function TechnologyTreeItem({ title, state, id }: TechnologyTreeItemProps) {
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    function onClick() {
        setRoadmapItemId(id);
    }

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
