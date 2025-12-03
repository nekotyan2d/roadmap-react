import { useState } from "react";
import { useAppStore } from "../../stores/app.js";
import "./TechnologyCard.css";
import TechnologyDataForm, { type Form } from "../forms/TechnologyDataForm.js";

type TechnologyCardProps = RoadmapItem;

function TechnologyCard({ title, description, links, id, state, note, deadline }: TechnologyCardProps) {
    const setRoadmapStateByIndex = useAppStore((state) => state.setRoadmapStateByIndex);
    const setRoadmapItemId = useAppStore((state) => state.setRoadmapItemId);

    function onChangeState(e: React.ChangeEvent<HTMLSelectElement>) {
        setRoadmapStateByIndex(id, e.target.value as RoadmapState);
    }

    function onCloseClick() {
        setRoadmapItemId(null);
    }

    function onSave(formData: Form) {
        console.log(formData);
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
                    initData={{ note, ...(deadline && { deadline: deadline }) }}
                    onSave={onSave}
                />
            </section>
        </article>
    );
}

export default TechnologyCard;
