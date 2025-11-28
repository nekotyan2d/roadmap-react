import "./RoadmapListModal.css";

import { useEffect, useState } from "react";
import Modal from "../modal/Modal.js";
import { useAppStore } from "../../stores/app.js";
import { parseRoadmap } from "../../utils/parseRoadmap.js";

interface RoadmapListModalProps {
    onClose: () => void;
    show: boolean;
}

function RoadmapListModal({ show, onClose }: RoadmapListModalProps) {
    const setRoadmap = useAppStore((state) => state.setRoadmap);

    const [roadmaps, setRoadmaps] = useState<RoadmapShortItem[]>([]);

    useEffect(() => {
        fetch("https://roadmap.rule35-1.ru/roadmaps")
            .then((data) => data.json())
            .then((data: { response: RoadmapShortItem[] }) => setRoadmaps(data.response));
    }, []);

    function onItemSelected(id: string) {
        fetch(`https://roadmap.rule35-1.ru/roadmaps/${id}`)
            .then((data) => data.json())
            .then((data: { response: Record<string, RoadmapItem>[] }) => {
                setRoadmap(parseRoadmap(JSON.stringify(data.response)));
                onClose();
            });
    }
    return (
        <Modal
            title="Выберите"
            show={show}
            onClose={onClose}>
            <div className="roadmap-list">
                {roadmaps.map((item) => (
                    <div
                        className="roadmap-item"
                        onClick={() => onItemSelected(item.id)}>
                        {item.title}
                    </div>
                ))}
            </div>
        </Modal>
    );
}

export default RoadmapListModal;
