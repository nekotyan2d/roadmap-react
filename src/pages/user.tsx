import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user.js";
import { useEffect } from "react";

function UserPage() {
    const nick = useUserStore((state) => state.nick);
    const navigate = useNavigate();

    useEffect(() => {
        if (nick === null) {
            navigate("/auth");
        }
    }, [nick, navigate]);

    if (nick == null) {
        return null;
    }

    return <div className="user-page">Привет, {nick}</div>;
}

export default UserPage;
