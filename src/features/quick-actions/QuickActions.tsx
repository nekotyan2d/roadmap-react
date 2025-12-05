import { useState } from "react";
import "./QuickActions.css";
import { useAppStore } from "../../stores/app.js";
import Popup from "../popup/Popup.js";

function QuickActions() {
    const roadmap = useAppStore((state) => state.roadmap);
    const markAllAsCompleted = useAppStore((state) => state.markAllAsCompleted);
    const markAllAsNotStarted = useAppStore((state) => state.markAllAsNotStarted);
    const [isPopupVisible, setPopupVisible] = useState(false);

    function selectRandom() {
        const notStartedItems = roadmap.filter((item) => item.state === "not-started");
        if (notStartedItems.length === 0) {
            return;
        }
        const randomItem = notStartedItems[Math.floor(Math.random() * notStartedItems.length)]!;
        const element = document.getElementById(`tech-item-${randomItem.id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry && entry.isIntersecting) {
                        element.classList.add("highlight");
                        observer.disconnect();

                        element.addEventListener(
                            "animationend",
                            () => {
                                element.classList.remove("highlight");
                            },
                            { once: true }
                        );
                    }
                },
                { threshold: 1.0 }
            );

            observer.observe(element);
        }
    }

    if (roadmap.length === 0) return null;

    const items = [
        { text: "Отметить все как выполненные", onClick: markAllAsCompleted },
        { text: "Сбросить выполнение", onClick: markAllAsNotStarted },
        { text: "Выбрать случайный", onClick: selectRandom },
    ];

    return (
        <div className="quick-actions-container">
            <button
                title="Быстрые действия"
                className="quick-actions-button"
                onClick={() => setPopupVisible(!isPopupVisible)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="m12 15.6l3.2-4.6h-2.85l2-7H9v8h3zm5.375-4.25l-6 8.675q-.15.225-.387.3t-.463 0t-.375-.262T10 19.6V14H9q-.825 0-1.412-.587T7 12V4q0-.825.588-1.412T9 2h5.85q.8 0 1.288.625T16.425 4L15 9h1.125q.9 0 1.338.8t-.088 1.55M12 12H9z"
                    />
                </svg>
            </button>
            {isPopupVisible && (
                <Popup
                    items={items}
                    initiatorClassName="quick-actions-button"
                    direction="right"
                    onClose={() => setPopupVisible(false)}
                />
            )}
        </div>
    );
}

export default QuickActions;
