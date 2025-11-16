import { useAppStore } from "../../stores/app.js";
import "./Statistics.css";

function Statistics() {
    const roadmap = useAppStore((state) => state.roadmap);

    if (roadmap.length == 0) return null;

    const completedCount = roadmap.filter((item) => item.state === "completed").length;
    const completedPercent = Math.round((completedCount / roadmap.length) * 100);
    const totalCount = roadmap.length;

    return (
        <div className="statistics">
            <div className="completed-count">{completedCount}</div>
            <div className="completion-progress">
                <div
                    className="bar"
                    style={{ width: `${completedPercent}%` }}></div>
                <div className="percentage">{completedPercent}%</div>
            </div>
            <div className="total-count">{totalCount}</div>
        </div>
    );
}

export default Statistics;
