import "./RoadmapListModal.css";

import { useEffect, useState } from "react";
import Modal from "../modal/Modal.js";
import { useAppStore } from "../../stores/app.js";
import { parseRoadmap } from "../../utils/parseRoadmap.js";
import { useSnackbarStore } from "../../stores/snackbar.js";

interface RoadmapListModalProps {
    onClose: () => void;
    show: boolean;
}

function RoadmapListModal({ show, onClose }: RoadmapListModalProps) {
    const setRoadmap = useAppStore((state) => state.setRoadmap);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    const [roadmaps, setRoadmaps] = useState<RoadmapShortItem[]>([]);

    useEffect(() => {
        fetch("https://roadmap.rule35-1.ru/roadmaps")
            .then((data) => data.json())
            .then((data: { response: RoadmapShortItem[] }) => setRoadmaps(data.response))
            .catch(() => {
                showSnackbar("Ошибка при загрузке списка роадмапов", "error");
            });
    }, []);

    function onItemSelected(id: string) {
        fetch(`https://roadmap.rule35-1.ru/roadmaps/${id}`)
            .then((data) => data.json())
            .then((data: { response: Record<string, RoadmapItem>[] }) => {
                setRoadmap(parseRoadmap(JSON.stringify(data.response)));
                showSnackbar("Роадмап успешно загружен", "success");
                onClose();
            })
            .catch(() => {
                showSnackbar("Ошибка при загрузке роадмапа", "error");
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
