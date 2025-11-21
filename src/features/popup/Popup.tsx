import { useEffect } from "react";
import "./Popup.css";

interface PopupItem {
    text: string;
    onClick: () => void;
}

interface PopupProps {
    items: PopupItem[];
    initiatorClassName: string;
    onClose: () => void;
}

function Popup({ items, onClose, initiatorClassName }: PopupProps) {
    const onWindowClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".popup") && !target.closest(`.${initiatorClassName}`)) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener("click", onWindowClick);
        return () => window.removeEventListener("click", onWindowClick);
    }, []);

    return (
        <div className="popup">
            <div className="popup-menu">
                {items.map((item, index) => (
                    <div
                        className="menu__item"
                        key={`popup-item-${index}`}
                        onClick={() => {
                            item.onClick();
                            onClose();
                        }}>
                        <div className="item__text">{item.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Popup;
