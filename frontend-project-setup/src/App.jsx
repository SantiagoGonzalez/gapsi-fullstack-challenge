import { AppBar, createMuiTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from "@material-ui/core"
import { Route, Switch } from "react-router-dom"
import { PROVEEDORES_URL } from "./constants/url-constants"
import HomePage from "./pages/home-page"
import ListaProveedoresPage from "./pages/lista-proveedores"


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <img src="/images/logo-gapsi-blanco.png" alt="Gapsi logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            e-Commerce Gapsi
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path={PROVEEDORES_URL} component={ListaProveedoresPage} />
      </Switch>

    </ThemeProvider>
  )
}

export default App
