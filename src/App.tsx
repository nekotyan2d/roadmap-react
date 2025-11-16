import "./App.css";
import FileImport from "./features/file/FileImport.js";
import { useAppStore } from "./stores/app.js";
import TechnologyCard from "./features/technology/TechnologyCard.js";
import FileExport from "./features/file/FileExport.js";
import TechnologyTreeItem from "./features/technology/TechnologyTreeItem.js";
import Statistics from "./features/statistics/Statistics.js";
import Modal from "./features/modal/Modal.js";
import React from "react";

function App() {
    const roadmap = useAppStore((state) => state.roadmap);
    const roadmapItemId = useAppStore((state) => state.roadmapItemId);
    const getCurrentRoadmapItem = useAppStore((state) => state.getCurrentRoadmapItem);
    const setCurrentRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    function View() {
        return (
            <div className="tech-tree">
                {roadmap.map((item, index) => (
                    <React.Fragment key={`tech-tree-item-${index}`}>
                        <TechnologyTreeItem
                            title={item.title}
                            state={item.state}
                            id={index}
                            key={`tech-tree-branch-${index}`}
                        />
                        <Modal
                            show={roadmapItemId === index}
                            title={item.title}
                            key={`modal-tech-card-${index}`}
                            onClose={() => setCurrentRoadmapItemId(null)}>
                            <TechnologyCard
                                title={item.title}
                                description={item.description}
                                state={item.state}
                                links={item.links}
                                note={item.note}
                                id={index}
                                key={`tech-card-${index}`}
                            />
                        </Modal>
                    </React.Fragment>
                ))}
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
                <Statistics />
                {View()}
            </main>
        </>
    );
}

export default App;
