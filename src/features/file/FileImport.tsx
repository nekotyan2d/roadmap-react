import "./FileImport.css";

import { useAppStore } from "../../stores/app.js";
import { useState } from "react";
import Popup from "../popup/Popup.js";
import RoadmapListModal from "./RoadmapListModal.js";
import { parseRoadmap } from "../../utils/parseRoadmap.js";

function FileImport() {
    const setRoadmap = useAppStore((state) => state.setRoadmap);

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isRoadmapListModalVisible, setRoadmapListModalVisible] = useState(false);

    const items = [
        { text: "Из файла", onClick: () => selectFile() },
        { text: "Выбрать", onClick: () => setRoadmapListModalVisible(true) },
    ];

    function selectFile() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.onchange = (e) => onFileSelected(e);
        input.click();
    }

    function onFileSelected(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!target || !("files" in target) || !target.files) return;

        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            if (!evt.target) return;

            const content = evt.target.result;
            if (typeof content !== "string") return;

            const roadmapArray = parseRoadmap(content);
            setRoadmap(roadmapArray);
        };
        if (file) reader.readAsText(file);
    }
    return (
        <div className="import-container">
            <button
                className="import-button"
                onClick={() => setPopupVisible(!isPopupVisible)}>
                Импорт
            </button>
            {isPopupVisible && (
                <Popup
                    items={items}
                    initiatorClassName="import-button"
                    onClose={() => setPopupVisible(false)}
                />
            )}
            {isRoadmapListModalVisible && (
                <RoadmapListModal
                    show={isRoadmapListModalVisible}
                    onClose={() => setRoadmapListModalVisible(false)}
                />
            )}
        </div>
    );
}

export default FileImport;
