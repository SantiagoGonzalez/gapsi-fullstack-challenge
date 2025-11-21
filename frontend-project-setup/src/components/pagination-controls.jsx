import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { ButtonGroup, Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  btnGroup: {
    // allow buttons to wrap on very small screens
    flexWrap: "wrap",
  },
  pageButton: {
    minWidth: 44,
  },
}))

/**
 * Props:
 * - page: número de página actual (1-based)
 * - totalPages: total de páginas (>=1)
 * - onChange: function(newPageNumber)
 */

export default function PaginationControls({ page = 1, totalPages = 1, onChange = () => {} }) {
  const classes = useStyles()
  const current = Math.max(1, Math.min(page, totalPages))

  // calcular los 3 botones centrales
  const getMiddlePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (current === 1) return [1, 2, 3]
    if (current === totalPages) return [totalPages - 2, totalPages - 1, totalPages]
    return [current - 1, current, current + 1]
  }

  const middlePages = getMiddlePages()

  const goTo = (page) => {
    const newPageNumber = Math.max(1, Math.min(page, totalPages))
    if (newPageNumber !== current) onChange(newPageNumber)
  }

  const atStart = current <= 1
  const atEnd = current >= totalPages

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.btnGroup} variant="outlined" color="default" aria-label="paginacion">
        {/* Dos botones al inicio: retroceder una página y retroceder a la primera */}
        <Button onClick={() => goTo(current - 1)} disabled={atStart} aria-label="anterior">
          <i className="fas fa-angle-left"></i>
        </Button>
        <Button onClick={() => goTo(1)} disabled={atStart} aria-label="primera">
          <i className="fas fa-angle-double-left"></i>
        </Button>

        {/* Tres botones centrales con números dinámicos */}
        {middlePages.map((p) => (
          <Button
            key={p}
            onClick={() => goTo(p)}
            className={classes.pageButton}
            variant={p === current ? "contained" : "outlined"}
            color={p === current ? "primary" : "default"}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </Button>
        ))}

        {/* Dos botones al final: avanzar una página y avanzar a la última */}
        <Button onClick={() => goTo(totalPages)} disabled={atEnd} aria-label="ultima">
          {/* &gt;&gt; */}
          <i className="fas fa-angle-double-right"></i>
        </Button>
        <Button onClick={() => goTo(current + 1)} disabled={atEnd} aria-label="siguiente">
          <i className="fas fa-angle-right"></i>
        </Button>
      </ButtonGroup>
    </div>
  )
}