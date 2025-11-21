import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core"

export default function AddProveedorDialog({ open, onClose, onAccept, initialForm = { nombre: "", razonSocial: "", direccion: "" } }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    setForm(initialForm)
  }, [initialForm, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (typeof onAccept === "function") onAccept(form)
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="agregar-proveedor-title" fullWidth maxWidth="sm">
      <DialogTitle id="agregar-proveedor-title">Agregar Proveedor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="nombre"
          label="Nombre"
          type="text"
          fullWidth
          value={form.nombre}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="razonSocial"
          label="Razón Social"
          type="text"
          fullWidth
          value={form.razonSocial}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="direccion"
          label="Dirección"
          type="text"
          fullWidth
          value={form.direccion}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Aceptar</Button>
      </DialogActions>
    </Dialog>
  )
}