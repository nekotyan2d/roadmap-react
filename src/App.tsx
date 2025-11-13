import "./App.css";
import FileImport from "./components/FileImport.js";
import { useAppStore } from "./stores/app.js";
import TechnologyCard from "./components/TechnologyCard.js";
import FileExport from "./components/FileExport.js";
import TechnologyTreeItem from "./components/TechnologyTreeItem.js";

function App() {
    const roadmap = useAppStore((state) => state.roadmap);
    const roadmapItemId = useAppStore((state) => state.roadmapItemId);
    const getCurrentRoadmapItem = useAppStore((state) => state.getCurrentRoadmapItem);

    function View() {
        if (roadmapItemId !== null) {
            const item = getCurrentRoadmapItem();
            if (!item) return null;

            return (
                <TechnologyCard
                    title={item.title}
                    description={item.description}
                    links={item.links}
                    id={roadmapItemId}
                    state={item.state}
                />
            );
        }
        return (
            <div className="tech-tree">
                {roadmap.map((item, index) => (
                    <TechnologyTreeItem
                        title={item.title}
                        state={item.state}
                        id={index}
                        key={`tech-tree-item-${index}`}
                    />
                ))}{" "}
            </div>
        );
    }

    return (
        <>
            <main>
                <h1>Roadmap</h1>
                <div className="toolbar">
                    <FileImport />
                    <FileExport />
                </div>

                {View()}
            </main>
        </>
    );
}

export default App;
