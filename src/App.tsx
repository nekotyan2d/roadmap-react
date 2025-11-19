import "./App.css";
import FileImport from "./features/file/FileImport.js";
import { useAppStore } from "./stores/app.js";
import TechnologyCard from "./features/technology/TechnologyCard.js";
import FileExport from "./features/file/FileExport.js";
import TechnologyTreeItem from "./features/technology/TechnologyTreeItem.js";
import Statistics from "./features/statistics/Statistics.js";
import Modal from "./features/modal/Modal.js";
import React from "react";
import Search from "./features/search/Search.js";

function App() {
    const originalRoadmap = useAppStore((state) => state.roadmap);
    const filteredRoadmap = useAppStore((state) => state.filteredRoadmap);
    const roadmapItemId = useAppStore((state) => state.roadmapItemId);
    const roadmapIsFiltered = useAppStore((state) => state.isFiltered);
    const getCurrentRoadmapItem = useAppStore((state) => state.getCurrentRoadmapItem);
    const setCurrentRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    function View() {
        const roadmap = roadmapIsFiltered ? filteredRoadmap : originalRoadmap;

        if (roadmapIsFiltered && roadmap.length === 0) {
            return <p>Ничего не нашлось</p>;
        }

        return (
            <div className="tech-tree">
                {roadmap.map((item) => (
                    <React.Fragment key={`tech-tree-item-${item.id}`}>
                        <TechnologyTreeItem
                            title={item.title}
                            state={item.state}
                            id={item.id}
                            key={`tech-tree-branch-${item.id}`}
                        />
                        <Modal
                            show={roadmapItemId === item.id}
                            title={item.title}
                            key={`modal-tech-card-${item.id}`}
                            onClose={() => setCurrentRoadmapItemId(null)}>
                            <TechnologyCard
                                title={item.title}
                                description={item.description}
                                state={item.state}
                                links={item.links}
                                note={item.note}
                                id={item.id}
                                key={`tech-card-${item.id}`}
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
                <Search />
                <Statistics />
                {View()}
            </main>
        </>
    );
}

export default App;
