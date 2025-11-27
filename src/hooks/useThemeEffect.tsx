import { useEffect } from "react";
import { useThemeStore } from "../stores/theme.js";

export const useThemeEffect = () => {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        document.documentElement.className = `theme-${theme}`;
    }, [theme]);
};
