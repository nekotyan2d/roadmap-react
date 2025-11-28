import "./statistics.css";

import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/app.js";
import { useEffect } from "react";

interface DataItem {
    name: string;
    value: number;
    color: string;
}

interface PieSegment {
    d: string;
    color: string;
}

function StatisticsPage() {
    const roadmap = useAppStore((state) => state.roadmap);

    const navigate = useNavigate();

    useEffect(() => {
        if (roadmap.length === 0) navigate("/");
    }, [roadmap, navigate]);

    const notStartedCount = roadmap.filter((item: { state: string }) => item.state === "not-started").length;
    const inProgressCount = roadmap.filter((item: { state: string }) => item.state === "in-progress").length;
    const completedCount = roadmap.filter((item: { state: string }) => item.state === "completed").length;
    const totalCount = roadmap.length;

    const data: DataItem[] = [
        { name: "Не начато", value: notStartedCount, color: "var(--color-tech-not-started-light)" },
        { name: "В процессе", value: inProgressCount, color: "var(--color-tech-in-progress-light)" },
        { name: "Выполнено", value: completedCount, color: "var(--color-tech-completed-light)" },
    ];

    const calculatePieSegments = (data: DataItem[]): PieSegment[] => {
        const total = data.reduce((sum: number, item: DataItem) => sum + item.value, 0);
        let cumulativePercent = 0;

        return data.map((item: DataItem) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += item.value / total;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

            const largeArcFlag = item.value / total > 0.5 ? 1 : 0;

            return {
                d: `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`,
                color: item.color,
            };
        });
    };

    const getCoordinatesForPercent = (percent: number): [number, number] => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    const pieSegments = calculatePieSegments(data);

    return (
        <div className="page">
            <div className="statistics-info">
                <div
                    className="statistics-item"
                    data-variant="not-started">
                    <div className="statistics-item__title">Не начато</div>
                    <div className="statistics-item__number">{notStartedCount}</div>
                </div>
                <div
                    className="statistics-item"
                    data-variant="in-progress">
                    <div className="statistics-item__title">В процессе</div>
                    <div className="statistics-item__number">{inProgressCount}</div>
                </div>
                <div
                    className="statistics-item"
                    data-variant="completed">
                    <div className="statistics-item__title">Выполнено</div>
                    <div className="statistics-item__number">{completedCount}</div>
                </div>
            </div>
            <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
                <svg
                    viewBox="-1 -1 2 2"
                    style={{ transform: "rotate(-90deg)" }}>
                    <defs>
                        <mask id="donut-mask">
                            <rect
                                x="-1"
                                y="-1"
                                width="2"
                                height="2"
                                fill="white"
                            />
                            <circle
                                cx="0"
                                cy="0"
                                r="0.6"
                                fill="black"
                            />
                        </mask>
                    </defs>
                    {pieSegments.map((segment: PieSegment, index: number) => (
                        <path
                            key={index}
                            d={segment.d}
                            fill={segment.color}
                            mask="url(#donut-mask)"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}

export default StatisticsPage;
