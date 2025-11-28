import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SettingsPage from "./pages/settings.js";
import IndexPage from "./pages/index.js";
import Header from "./features/header/Header.js";
import { useThemeEffect } from "./hooks/useThemeEffect.js";
import StatisticsPage from "./pages/statistics.js";

function App() {
    useThemeEffect();

    return (
        <Router basename="/roadmap-react/">
            <Header />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<IndexPage />}
                    />
                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />
                    <Route
                        path="/statistics"
                        element={<StatisticsPage />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
