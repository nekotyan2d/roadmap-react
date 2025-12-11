import { Alert, Snackbar as ReactSnackbar } from "@mui/material";
import { useSnackbarStore } from "../../stores/snackbar.js";

function Snackbar() {
    const { open, message, severity, hideSnackbar } = useSnackbarStore();

    return (
        <ReactSnackbar
            open={open}
            autoHideDuration={3000}
            onClose={hideSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <Alert
                onClose={hideSnackbar}
                severity={severity}
                variant="filled"
                sx={{ width: "100%" }}>
                {message}
            </Alert>
        </ReactSnackbar>
    );
}

export default Snackbar;
