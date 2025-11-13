import { useAppStore } from "../stores/app";
import "./TechnologyTreeItem.css";
function TechnologyTreeItem({ title, state, id }) {
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);
    const getCurrentRoadmapItem = useAppStore((state) => state.getCurrentRoadmapItem);

    function onClick() {
        setRoadmapItemId(id);
        console.log(getCurrentRoadmapItem());
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
