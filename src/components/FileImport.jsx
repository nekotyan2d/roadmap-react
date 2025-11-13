import { useAppStore } from "../stores/app";

function FileImport() {
    const setRoadmap = useAppStore((state) => state.setRoadmap);

    function onClick(e) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.onchange = onFileSelected;
        input.click();
    }

    function onFileSelected(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const content = evt.target.result;
            const roadmapArray = Object.values(JSON.parse(content)).map((item) => ({
                ...item,
                state: item.state !== undefined ? item.state : "not-started",
            }));
            setRoadmap(roadmapArray);
        };
        reader.readAsText(file);
    }
    return (
        <>
            <button onClick={onClick}>Импорт</button>
        </>
    );
}

export default FileImport;
