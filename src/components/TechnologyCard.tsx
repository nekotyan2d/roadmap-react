import { useAppStore } from "../stores/app.js";
import "./TechnologyCard.css";

interface TechnologyCardProps {
    title: string;
    description: string;
    links: { type: string; title: string; url: string }[];
    id: number;
    state: RoadmapState;
}

function TechnologyCard({ title, description, links, id, state }: TechnologyCardProps) {
    const setRoadmapStateByIndex = useAppStore((state) => state.setRoadmapStateByIndex);
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    function onChangeState(e: React.ChangeEvent<HTMLSelectElement>) {
        setRoadmapStateByIndex(id, e.target.value as RoadmapState);
    }

    function onCloseClick() {
        setRoadmapItemId(null);
    }

    return (
        <article className="technology-card">
            <select
                className={`card__state card__state--${state}`}
                value={state}
                onChange={onChangeState}>
                <option value="not-started">Не начато</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершено</option>
            </select>
            <p>{description}</p>
            <ul className="card__links">
                {links.map((link) => (
                    <li
                        className="card__link"
                        key={`link_${id}_${link.url}`}>
                        <div className={`link__label link__label--${link.type}`}>{link.type}</div>
                        <a
                            className="link__url"
                            href={link.url}>
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default TechnologyCard;
