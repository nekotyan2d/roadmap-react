import { Edit } from "@mui/icons-material";
import "./StateEditMode.css";
import { useAppStore } from "../../stores/app.js";

function StateEditMode() {
    const stateEditing = useAppStore((state) => state.stateEditing);
    const setStateEditing = useAppStore((state) => state.setStateEditing);
    return (
        <div
            className="button state-edit-mode-button"
            data-active={stateEditing}
            title="Режим редактирования"
            onClick={() => setStateEditing(!stateEditing)}>
            <Edit />
        </div>
    );
}

export default StateEditMode;
