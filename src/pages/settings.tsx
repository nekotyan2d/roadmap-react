import { useAppStore } from "../stores/app.js";
import { useThemeStore } from "../stores/theme.js";

function SettingsPage() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const resetStore = useAppStore((state) => state.resetStore);
    return (
        <div className="page">
            <button onClick={toggleTheme}>Сменить тему</button>
            <button onClick={resetStore}>Очистить данные</button>
        </div>
    );
}

export default SettingsPage;
