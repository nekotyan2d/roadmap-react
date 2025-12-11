import { Cancel, Person } from "@mui/icons-material";
import { useAppStore } from "../../stores/app.js";
import MultipleEditing from "../quick-actions/MultipleEditing.js";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const roadmap = useAppStore((state) => state.roadmap);
    const selectedItems = useAppStore((state) => state.selectedItems);
    const setSelectedItems = useAppStore((state) => state.setSelectedItems);

    function getHeader() {
        switch (location.pathname) {
            case "/":
                return selectedItems.length === 0 ? (
                    <>
                        <h1>Roadmap</h1>
                        {roadmap.length > 0 && (
                            <Link
                                className="statistics"
                                to="/statistics">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M3 21q-.425 0-.712-.288T2 20t.288-.712T3 19h18q.425 0 .713.288T22 20t-.288.713T21 21zm1.5-3q-.625 0-1.062-.437T3 16.5v-4q0-.625.438-1.062T4.5 11t1.063.438T6 12.5v4q0 .625-.437 1.063T4.5 18m5 0q-.625 0-1.062-.437T8 16.5v-9q0-.625.438-1.062T9.5 6t1.063.438T11 7.5v9q0 .625-.437 1.063T9.5 18m5 0q-.625 0-1.062-.437T13 16.5v-6q0-.625.438-1.062T14.5 9t1.063.438T16 10.5v6q0 .625-.437 1.063T14.5 18m5 0q-.625 0-1.062-.437T18 16.5v-12q0-.625.438-1.062T19.5 3t1.063.438T21 4.5v12q0 .625-.437 1.063T19.5 18"
                                    />
                                </svg>
                            </Link>
                        )}

                        <Link
                            className="settings"
                            to="/settings">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.487 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"
                                />
                            </svg>
                        </Link>
                        <Link
                            className="user"
                            to="/user">
                            <Person />
                        </Link>
                    </>
                ) : (
                    <div className="selected-actions">
                        <div className="selected-actions__count">Выделено {selectedItems.length}</div>
                        <MultipleEditing />
                        <button
                            className="button selected-actions__clear"
                            onClick={() => setSelectedItems([])}>
                            <Cancel />
                        </button>
                    </div>
                );
            case "/settings":
                return (
                    <>
                        <Link
                            to="/"
                            className="back">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                                />
                            </svg>
                        </Link>
                        <h1>Настройки</h1>
                    </>
                );
            case "/statistics":
                return (
                    <>
                        <Link
                            to="/"
                            className="back">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                                />
                            </svg>
                        </Link>
                        <h1>Статистика</h1>
                    </>
                );
            default:
                return (
                    <>
                        <h1>Roadmap</h1>
                    </>
                );
        }
    }

    return <header className="app-header">{getHeader()}</header>;
}

export default Header;
