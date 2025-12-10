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

    const roadmap = roadmapIsFiltered ? filteredRoadmap : originalRoadmap;

    const selectedItems = useAppStore((state) => state.selectedItems);
    const setSelectedItems = useAppStore((state) => state.setSelectedItems);

    const isSelected = selectedItems.includes(id);

    function handleClick(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (target.closest(".bubble-title") && !target.closest(".selection-checkbox")) {
            onClick();
        }
    }

    function handleMouseDown(e: MouseEvent) {
        if (e.button === 0) {
            // ЛКМ: Начало выделения
            setSelectedItems([id]);
        }
    }

    function handleMouseEnter(e: MouseEvent) {
        if (e.buttons === 1) {
            setSelectedItems([...new Set([...selectedItems, id])]);
        }
    }

    return (
        <>
            <div
                className={`tech-tree-item tech-tree-item--${state}`}
                id={`tech-item-${id}`}
                onClick={(e) => handleClick(e)}>
                <div className="bubble-title">
                    <h3>{title}</h3>
                    <input
                        type="checkbox"
                        className="selection-checkbox"
                    />
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
