import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "./TechnologyDataForm.css";

interface TechnologyDataFormProps {
    initData: Form;
    onSave: (formData: Form) => void;
}

export interface Form {
    note: string;
    deadline: Date | null;
}

function TechnologyDataForm({ initData, onSave }: TechnologyDataFormProps) {
    const [formData, setFormData] = useState({
        note: initData.note,
        deadline: initData.deadline || null,
    });

    const deadlineString = formData.deadline ? formData.deadline.toISOString().split("T")[0] : "";

    const [isSaveDisabled, setSaveDisabled] = useState(true);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSave(formData);
    }

    function validate() {
        const hasChanges =
            formData.note !== initData.note ||
            (formData.deadline?.getTime() || null) !== (initData.deadline?.getTime() || null);
        setSaveDisabled(!hasChanges);
    }

    useEffect(validate, [formData, initData]);

    function onNoteChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setFormData((val) => ({ ...val, note: e.target.value }));
    }

    function onDeadlineChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const newDate = value ? new Date(value) : null;

        setFormData((val) => ({ ...val, deadline: newDate }));
    }

    return (
        <form
            className="technology-data-form"
            onSubmit={onSubmit}>
            <h3>Заметки</h3>
            <textarea
                className="notes__textarea"
                placeholder="Введите текст заметки"
                value={formData.note}
                onChange={onNoteChange}
            />
            <h3>Дедлайн</h3>
            <input
                className="deadline__input"
                type="date"
                value={deadlineString}
                onChange={onDeadlineChange}
                min={new Date().toISOString().split("T")[0]}></input>
            <button
                className="form-save"
                disabled={isSaveDisabled}>
                Сохранить
            </button>
        </form>
    );
}

export default TechnologyDataForm;
