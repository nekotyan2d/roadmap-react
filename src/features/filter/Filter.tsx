import { useEffect, useState } from "react";
import "./Filter.css";
import Popup from "../popup/Popup.js";
import { useAppStore } from "../../stores/app.js";

function Filter() {
    const roadmap = useAppStore((state) => state.roadmap);
    const filterByState = useAppStore((state) => state.filterByState);
    const [isPopupVisible, setPopupVisible] = useState(false);

    if (roadmap.length === 0) return null;

    const items = [
        { text: "Все", onClick: () => filterByState("all") },
        { text: "Не начато", onClick: () => filterByState("not-started") },
        { text: "В процессе", onClick: () => filterByState("in-progress") },
        { text: "Выполнено", onClick: () => filterByState("completed") },
    ];

    return (
        <div className="filter-container">
            <button
                title="Фильтр"
                className="filter-button"
                onClick={() => setPopupVisible(!isPopupVisible)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M11 18q-.425 0-.712-.288T10 17t.288-.712T11 16h2q.425 0 .713.288T14 17t-.288.713T13 18zm-4-5q-.425 0-.712-.288T6 12t.288-.712T7 11h10q.425 0 .713.288T18 12t-.288.713T17 13zM4 8q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
                    />
                </svg>
            </button>
            {isPopupVisible && (
                <Popup
                    items={items}
                    initiatorClassName="filter-button"
                    direction="right"
                    onClose={() => setPopupVisible(false)}
                />
            )}
        </div>
    );
}

export default Filter;
