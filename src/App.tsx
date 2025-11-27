import "./App.css";
import FileImport from "./features/file/FileImport.js";
import { useAppStore } from "./stores/app.js";
import TechnologyCard from "./features/technology/TechnologyCard.js";
import FileExport from "./features/file/FileExport.js";
import TechnologyTreeItem from "./features/technology/TechnologyTreeItem.js";
import Statistics from "./features/statistics/Statistics.js";
import Modal from "./features/modal/Modal.js";
import React, { useEffect } from "react";
import Search from "./features/search/Search.js";
import Filter from "./features/filter/Filter.js";
import QuickActions from "./features/quick-actions/QuickActions.js";
import { Route, BrowserRouter as Router, Routes, useNavigate, useSearchParams } from "react-router-dom";

function App() {
    const originalRoadmap = useAppStore((state) => state.roadmap);
    const filteredRoadmap = useAppStore((state) => state.filteredRoadmap);
    const roadmapIsFiltered = useAppStore((state) => state.isFiltered);
    const getCurrentRoadmapItem = useAppStore((state) => state.getCurrentRoadmapItem);
    const setCurrentRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    function View() {
        const roadmap = roadmapIsFiltered ? filteredRoadmap : originalRoadmap;

        const [searchParams, setSearchParams] = useSearchParams();
        const navigate = useNavigate();

        const roadmapItemId = searchParams.get("task");

        useEffect(() => {
            if (roadmapItemId !== null) {
                setCurrentRoadmapItemId(Number(roadmapItemId));
            } else {
                setCurrentRoadmapItemId(null);
            }
        }, [roadmapItemId]);

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
                            onClick={() => setSearchParams({ task: item.id.toString() })}
                        />
                        <Modal
                            show={roadmapItemId === String(item.id)}
                            title={item.title}
                            key={`modal-tech-card-${item.id}`}
                            onClose={() => setSearchParams({})}>
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
        <Router basename="/roadmap-react/">
            <main>
                <h1>Roadmap</h1>
                <div className="toolbar">
                    <FileImport />
                    <FileExport />
                </div>
                <div className="filterbar">
                    <Search />
                    <Filter />
                    <QuickActions />
                </div>
                <Statistics />
                <Routes>
                    <Route
                        path="/"
                        element={<View />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
