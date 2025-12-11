import { useAppStore } from "../stores/app.js";
import { useSnackbarStore } from "../stores/snackbar.js";
import { useThemeStore } from "../stores/theme.js";

function SettingsPage() {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const resetStore = useAppStore((state) => state.resetStore);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    return (
        <div className="page">
            <button
                className="button"
                onClick={toggleTheme}>
                Сменить тему
            </button>
            <button
                className="button"
                onClick={() => {
                    resetStore();
                    showSnackbar("Данные очищены", "success");
                }}>
                Очистить данные
            </button>
        </div>
    );
}

export default SettingsPage;
