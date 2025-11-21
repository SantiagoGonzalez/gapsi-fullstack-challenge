"use client"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import PaginationControls from "../components/pagination-controls"
import React, { useState, useEffect } from "react"
import { getProveedoresPage, addProveedor, deleteProveedor } from "../services/proveedores-service"
import ProveedoresTable from "../components/table-proveedores"
import AddProveedorDialog from "../components/add-proveedor-dialog"
import ConfirmDeleteDialog from "../components/confirm-delete-dialog"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  fabAdd: {
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#43a047",
    },
  },
  fabDelete: {
    backgroundColor: "#f44336",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e53935",
    },
  },
  dialogAccept: {
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": { backgroundColor: "#43a047" },
  },
  dialogCancel: {
    backgroundColor: "#f44336",
    color: "#fff",
    "&:hover": { backgroundColor: "#e53935" },
  },
  navButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(3),
  },
}))

function ListaProveedoresPage() {
  const classes = useStyles()
  const history = useHistory()
  const [page, setPage] = useState(1)
  // modal + addProveedorForm state
  const [openAddModal, setOpenAddModal] = useState(false)
  const [addProveedorForm, setProveedorForm] = useState({ nombre: "", razonSocial: "", direccion: "" })
  //todo: esto podria ir en un config o constante global
  const PAGE_SIZE = 4;

  const [proveedoresPage, setProveedoresPage] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: PAGE_SIZE
  })
  //selected para eliminar
  const [selectedId, setSelectedId] = useState(null)

  // confirm delete dialog state
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  
  const handleAddProveedor = () => {
    // abrir modal, reseteo valores form
    setProveedorForm({ nombre: "", razonSocial: "", direccion: "" })
    setOpenAddModal(true)
  }
  
  const handleCancel = () => {
    setOpenAddModal(false)
  }

  // now receives addProveedorForm data from dialog
  const handleAceptar = async (formData) => {
    try {
      const addResponse = await addProveedor(formData.nombre, formData.razonSocial, formData.direccion)
      // recargar la página actual
      await fetchPageData(page)
      setOpenAddModal(false)
    } catch (err) {
      //no es lo mejor, idealmente mostrar un modal de error.
      window.alert(err.message)
      console.error(err.message)
    }
  }

  // open confirmation dialog (called by Delete FAB)
  const handleDeleteProveedor = () => {
    if (!selectedId) return // nothing selected
    setOpenConfirmDelete(true)
  }

  // actual confirmed deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteProveedor(selectedId)
      // recargar la página actual
      await fetchPageData(page)
    } catch (err) {
      console.error("Error al eliminar proveedor:", err)
    } finally {
      setOpenConfirmDelete(false)
      setSelectedId(null)
    }
  }
  

// Fetch proveedores data, cuando cambie la página hace el fetch de la pagina siguiente
// ideal mover esto a un custom hook
 const fetchPageData = async (page) => {
   try {
     const response = await getProveedoresPage(page-1, PAGE_SIZE);
     setProveedoresPage(response.data.proveedores);
   } catch (error) {
     console.error("Error al cargar proveedores:", error);
   }
 }

  useEffect(() => {
    fetchPageData(page)
  }, [page]);
  
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={3}>


          {/* TABLE HEADER : TITLE + ACTION BUTTONS */}

          <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 8 }}>
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                <i className="fa-solid fa-users" style={{ marginRight: 8 }}></i> Lista de Proveedores
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.actions}>
                <Tooltip title="Agregar proveedor">
                  <Fab size="small" className={classes.fabAdd} onClick={handleAddProveedor} aria-label="agregar">
                    <i className="fas fa-plus" aria-hidden="true"></i>
                  </Fab>
                </Tooltip>
                <Tooltip title="Eliminar proveedor">
                  <Fab size="small" className={classes.fabDelete} onClick={handleDeleteProveedor} aria-disabled="debe seleccionar un proveedor" disabled={selectedId==null}aria-label="eliminar">
                    <i className="fas fa-trash" aria-hidden="true"></i>
                  </Fab>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
          <ProveedoresTable rows={proveedoresPage.content} selectedId={selectedId} onSelect = {setSelectedId}/>
          <PaginationControls page={page} totalPages={proveedoresPage.totalPages} onChange={(p) => setPage(p)} />

          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={() => history.push("/")}>
              Volver al Home
            </Button>
          </Box>
        </Paper>
      </Container>

      
          <AddProveedorDialog open={openAddModal} onClose={handleCancel} onAccept={handleAceptar} initialForm={addProveedorForm} />
         {/* Confirmación eliminación (extracted) */}
         <ConfirmDeleteDialog
           open={openConfirmDelete}
           onClose={() => setOpenConfirmDelete(false)}
           onConfirm={handleConfirmDelete}
           confirmClassName={classes.dialogAccept}
           cancelClassName={classes.dialogCancel}
         />

    </div>
  )
}

export default ListaProveedoresPage

