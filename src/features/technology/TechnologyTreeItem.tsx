import type { MouseEvent } from "react";
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
    const stateEditing = useAppStore((state) => state.stateEditing);
    const setRoadmapStateByIndex = useAppStore((state) => state.setRoadmapStateByIndex);

    const roadmap = roadmapIsFiltered ? filteredRoadmap : originalRoadmap;

    const selectedItems = useAppStore((state) => state.selectedItems);
    const setSelectedItems = useAppStore((state) => state.setSelectedItems);

    const selectionMode = useAppStore((state) => state.selectionMode);
    const setSelectionMode = useAppStore((state) => state.setSelectionMode);

    const isSelected = selectedItems.includes(id);

    function handleMouseDown(e: MouseEvent) {
        if ((e.target as HTMLElement).closest(".bubble-title")) {
            return;
        }

        if (e.button === 0) {
            // ЛКМ: Начало выделения
            e.preventDefault();
            setSelectionMode(isSelected ? "remove" : "add");
            if (isSelected) {
                setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
            } else {
                setSelectedItems([...selectedItems, id]);
            }
        }
    }

    function handleMouseEnter(e: MouseEvent) {
        if (e.buttons === 1) {
            if (selectionMode === "add" && !isSelected) {
                setSelectedItems([...selectedItems, id]);
            } else if (selectionMode === "remove" && isSelected) {
                setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
            }
        }
    }

    function handleClick(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (stateEditing) {
            const nextState =
                state === "not-started" ? "in-progress" : state === "in-progress" ? "completed" : "not-started";
            setRoadmapStateByIndex(id, nextState);
        } else {
            onClick();
        }
    }

    return (
        <>
            <div
                className="tech-tree-item-container"
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseEnter={(e) => handleMouseEnter(e)}>
                <div
                    className={`tech-tree-item tech-tree-item--${state}`}
                    id={`tech-item-${id}`}>
                    <div
                        className="bubble-title"
                        onClick={handleClick}>
                        <h3>{title}</h3>
                        <input
                            type="checkbox"
                            className="selection-checkbox"
                            checked={isSelected}
                            readOnly
                        />
                    </div>
                    {!(roadmap.at(-1)?.id == id) && <div className="path"></div>}

                    {deadline && state != "completed" && (
                        <div className="bubble-deadline">
                            {deadline.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default TechnologyTreeItem;
