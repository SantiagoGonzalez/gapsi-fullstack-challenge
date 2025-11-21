import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Checkbox
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  noData: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
  // base row: pointer + smooth transition for background and subtle elevation
  row: {
    cursor: "pointer",
    transition: "background-color 200ms ease, box-shadow 200ms ease, transform 120ms ease",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      transform: "translateY(-1px)",
    },
  },
  // kept for explicit hover-controlled styling if needed by JS
  rowHover: {
    backgroundColor: theme.palette.action.selected,
  },
  /* soften selected highlight: use action.selected for a subtler background
     keep text color readable and slightly bolder */
  rowSelected: {
    backgroundColor: theme.palette.action.selected,
    fontWeight: 600,
    "& td, & th": {
      color: theme.palette.text.primary,
    },
    "& .MuiCheckbox-root": {
      color: theme.palette.primary.main,
    },
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}))

/**
 * Props:
 * - rows: array of proveedores
 * - selectedId: id of currently selected row (optional, for controlled use)
 * - onSelect: function(id) called when user clicks a row
 *
 * Behavior:
 * - internal state holds selected id (initialised from prop if provided)
 * - single-select only
 * - hover highlights row (lighter)
 * - clicked row stays highlighted (stronger) and shows checkbox next to name
 */
export default function ProveedoresTable({ rows = [], selectedId = null, onSelect = () => {} }) {
  const classes = useStyles()
  const [hovered, setHovered] = useState(null)

  return (
    <TableContainer component={Paper} className={classes.container}>
      {rows.length === 0 ? (
        <Typography variant="body1" className={classes.noData}>
          No hay proveedores
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Razón social</TableCell>
              <TableCell>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              const id = row.id ?? idx
              const isHovered = hovered === id
              const isSelected = selectedId === id

              const rowClass = [
                classes.row,
                !isSelected && isHovered ? classes.rowHover : null,
                isSelected ? classes.rowSelected : null,
              ].filter(Boolean).join(" ")

              return (
                <TableRow
                  key={id}
                  className={rowClass}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(isSelected ? null : id)}
                  tabIndex={0}
                  role="button"
                  aria-selected={isSelected}
                >
                  <TableCell>
                    <div className={classes.nameCell}>
                      {isSelected && <Checkbox checked readOnly />}
                      <span>{row.nombre}</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.razonSocial}</TableCell>
                  <TableCell>{row.direccion}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}