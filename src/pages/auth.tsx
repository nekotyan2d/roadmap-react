import "./auth.css";

import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user.js";
import { useState } from "react";

function AuthPage() {
    const navigate = useNavigate();
    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        useUserStore.getState().setNick(nick);
        navigate("/user");
    }
    const [nick, setNick] = useState("");

    return (
        <div className="auth-page">
            <form
                className="auth-form"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Введите ник"
                    onChange={(e) => setNick(e.target.value)}
                    required
                />
                <button className="button">Войти</button>
            </form>
        </div>
    );
}

export default AuthPage;
