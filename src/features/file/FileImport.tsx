import type React from "react";
import { useAppStore } from "../../stores/app.js";

function FileImport() {
    const setRoadmap = useAppStore((state) => state.setRoadmap);

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
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

            const roadmapArray = Object.values(JSON.parse(content) as RoadmapItem[]).map((item) => ({
                ...item,
                state: item.state !== undefined ? item.state : "not-started",
            }));
            setRoadmap(roadmapArray);
        };
        if (file) reader.readAsText(file);
    }
    return (
        <>
            <button onClick={onClick}>Импорт</button>
        </>
    );
}

export default FileImport;
