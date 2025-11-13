import { useAppStore } from "../stores/app.js";

function FileExport() {
    const roadmap = useAppStore((state) => state.roadmap);

    function onClick() {
        const dataStr = JSON.stringify(roadmap, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "roadmap.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    if (roadmap.length == 0) return null;

    return <button onClick={onClick}>Экспорт</button>;
}

export default FileExport;
