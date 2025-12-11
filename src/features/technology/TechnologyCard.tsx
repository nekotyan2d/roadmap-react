import { useState } from "react";
import { useAppStore } from "../../stores/app.js";
import "./TechnologyCard.css";
import TechnologyDataForm, { type Form } from "../forms/TechnologyDataForm.js";
import { useSnackbarStore } from "../../stores/snackbar.js";

type TechnologyCardProps = RoadmapItem;

function TechnologyCard({ title, description, links, id, state, note, deadline }: TechnologyCardProps) {
    const setRoadmapStateByIndex = useAppStore((state) => state.setRoadmapStateByIndex);
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);
    const setRoadmapNoteByIndex = useAppStore((state) => state.setRoadmapNoteByIndex);
    const setRoadmapDeadlineByIndex = useAppStore((state) => state.setRoadmapDeadlineByIndex);
    const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

    function onChangeState(e: React.ChangeEvent<HTMLSelectElement>) {
        setRoadmapStateByIndex(id, e.target.value as RoadmapState);
    }

    function onCloseClick() {
        setRoadmapItemId(null);
    }

    function onSave(formData: Form) {
        setRoadmapNoteByIndex(id, formData.note);
        setRoadmapDeadlineByIndex(id, formData.deadline);
        showSnackbar("Данные сохранены", "success");
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
            <section className="card__data">
                <TechnologyDataForm
                    initData={{ note, deadline }}
                    onSave={onSave}
                />
            </section>
        </article>
    );
}

export default TechnologyCard;
