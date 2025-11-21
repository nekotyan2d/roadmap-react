import { useAppStore } from "../../stores/app.js";
import "./Statistics.css";

function Statistics() {
    const roadmap = useAppStore((state) => state.roadmap);

    if (roadmap.length == 0) return null;

    const notStartedCount = roadmap.filter((item) => item.state === "not-started").length;
    const inProgressCount = roadmap.filter((item) => item.state === "in-progress").length;
    const completedCount = roadmap.filter((item) => item.state === "completed").length;
    const completedPercent = Math.round((completedCount / roadmap.length) * 100);
    const totalCount = roadmap.length;

    return (
        <div className="statistics">
            <div className="stats">
                <div
                    className="stats-item"
                    data-variant="total">
                    <div className="stats-number">{totalCount}</div>
                    <div className="stats-label">Всего</div>
                </div>
                <div
                    className="stats-item"
                    data-variant="not-started">
                    <div className="stats-number">{notStartedCount}</div>
                    <div className="stats-label">Не начато</div>
                </div>
                <div
                    className="stats-item"
                    data-variant="in-progress">
                    <div className="stats-number">{inProgressCount}</div>
                    <div className="stats-label">В процессе</div>
                </div>
                <div
                    className="stats-item"
                    data-variant="completed">
                    <div className="stats-number">{completedCount}</div>
                    <div className="stats-label">Выполнено</div>
                </div>
            </div>
            <div className="completion">
                <div className="completed-count">{completedCount}</div>
                <div className="completion-progress">
                    <div
                        className="bar"
                        style={{ width: `${completedPercent}%` }}></div>
                    <div className="percentage">{completedPercent}%</div>
                </div>
                <div className="total-count">{totalCount}</div>
            </div>
        </div>
    );
}

export default Statistics;
