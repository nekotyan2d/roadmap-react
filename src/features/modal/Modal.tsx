import type React from "react";
import "./Modal.css";
import { useEffect } from "react";

interface ModalProps {
    show: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

function Modal({ show, title, children, onClose }: ModalProps) {
    useEffect(() => {
        const onEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && show) {
                onClose();
            }
        };

        document.body.style.overflow = show ? "hidden" : "auto";

        if (show) {
            window.addEventListener("keydown", onEscape);
        } else {
            window.removeEventListener("keydown", onEscape);
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onEscape);
        };
    }, [show]);

    if (!show) return null;

    function onBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            className="modal-backdrop"
            onClick={onBackdropClick}>
            <div className="modal-content">
                <header className="modal-content__header">
                    <h2 className="modal-content__title">{title}</h2>
                    <button
                        className="button modal__close"
                        onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                            />
                        </svg>
                    </button>
                </header>
                {children}
            </div>
        </div>
    );
}

export default Modal;
