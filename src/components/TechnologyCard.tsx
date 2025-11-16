import { useState } from "react";
import { useAppStore } from "../stores/app.js";
import "./TechnologyCard.css";

interface TechnologyCardProps {
    title: string;
    description: string;
    links: { type: string; title: string; url: string }[];
    id: number;
    state: RoadmapState;
    note: string;
}

function TechnologyCard({ title, description, links, id, state, note }: TechnologyCardProps) {
    const setRoadmapStateByIndex = useAppStore((state) => state.setRoadmapStateByIndex);
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);
    const setRoadmapNoteByIndex = useAppStore((state) => state.setRoadmapNoteByIndex);

    function onChangeState(e: React.ChangeEvent<HTMLSelectElement>) {
        setRoadmapStateByIndex(id, e.target.value as RoadmapState);
    }

    function onCloseClick() {
        setRoadmapItemId(null);
    }

    const [noteText, setNoteText] = useState(note);

    function onNoteSave() {
        setRoadmapNoteByIndex(id, noteText);
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
            <section className="card__notes">
                <h3>Заметки</h3>
                <header className="notes__header">
                    <textarea
                        className="notes__textarea"
                        placeholder="Введите текст заметки"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                    <button
                        className="notes__save"
                        disabled={noteText == note}
                        onClick={onNoteSave}>
                        Сохранить
                    </button>
                </header>
            </section>
        </article>
    );
}

export default TechnologyCard;
