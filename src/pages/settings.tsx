import { useThemeStore } from "../stores/theme.js";

function SettingsPage() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    return (
        <div>
            <button onClick={toggleTheme}>Сменить тему</button>
        </div>
    );
}

export default SettingsPage;
