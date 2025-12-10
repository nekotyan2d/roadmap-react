import { useState } from "react";
import "./MultipleEditing.css";
import Popup from "../popup/Popup.js";
import { useAppStore } from "../../stores/app.js";

function MultipleEditing() {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const selectedItems = useAppStore((state) => state.selectedItems);
    const roadmap = useAppStore((state) => state.roadmap);
    const setRoadmap = useAppStore((state) => state.setRoadmap);
    const clearSelectedItems = useAppStore((state) => state.clearSelectedItems);

    const handleStateChange = (newState: RoadmapState) => {
        const updatedRoadmap = roadmap.map((item) =>
            selectedItems.includes(item.id) ? { ...item, state: newState } : item
        );
        setRoadmap(updatedRoadmap);
        clearSelectedItems();
        setPopupVisible(false);
    };

    const items = [
        { text: "Не начато", onClick: () => handleStateChange("not-started") },
        { text: "В процессе", onClick: () => handleStateChange("in-progress") },
        { text: "Завершено", onClick: () => handleStateChange("completed") },
    ];

    return (
        <div className="multiple-editing-container">
            <button
                className="multiple-editing-button"
                onClick={() => setPopupVisible(!isPopupVisible)}>
                Изменить
            </button>
            {isPopupVisible && (
                <Popup
                    items={items}
                    initiatorClassName="multiple-editing-button"
                    direction="right"
                    onClose={() => setPopupVisible(false)}
                />
            )}
        </div>
    );
}

export default MultipleEditing;
