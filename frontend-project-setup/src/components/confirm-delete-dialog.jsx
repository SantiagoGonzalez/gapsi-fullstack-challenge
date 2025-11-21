import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core"

export default function ConfirmDeleteDialog({
  open,
  onClose = () => {},
  onConfirm = () => {},
  title = "Confirmar eliminación",
  message = "Desea eliminar este elemento?",
  confirmClassName,
  cancelClassName,
}) {
return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirm-delete-title">
        <DialogTitle id="confirm-delete-title" style={{ textAlign: "center" }}>
            {title}
        </DialogTitle>

        <DialogContent
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography>{message}</Typography>
        </DialogContent>

        <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={onClose} className={cancelClassName} variant="contained">
                Cancelar
            </Button>
            <Button
                onClick={() => {
                    onConfirm()
                }}
                className={confirmClassName}
                variant="contained"
                style={{ marginLeft: 8 }}
            >
                Aceptar
            </Button>
        </DialogActions>
    </Dialog>
)
}