"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Container, Paper, TextField, Button, Typography, Grid, AppBar, Toolbar,CardMedia } from "@material-ui/core"
import { KeyboardDatePicker } from "@material-ui/pickers"
import { makeStyles } from "@material-ui/core/styles"
import { setUserData } from "../store/store"
import { getCandidato,getCandidatoById, getAppVersion } from "../services/login-service"
import {PROVEEDORES_URL} from "../constants/url-constants"
import Footer from "../components/footer"


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  media: {
    height: 200,
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submitButton: {
    marginTop: theme.spacing(3),
  },
  navButton: {
    marginLeft: theme.spacing(2),
  },
}))

function HomePage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [candidato, setCandidato] = useState({
    nombre: "",
    imagenUrl: ""
  });
  const [version, setVersion] = useState("");

  //no es ideal, lo mejor seria moverlo a un custom hook
  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        const candidato = await getCandidatoById(1);
        setCandidato(candidato);

        const appVersion = await getAppVersion();
        setVersion(appVersion);
      } catch (error) {
        console.error("Error al obtener el candidato:", error);
      }
    };

    fetchInitialValues();
  }, []);

  const goToListaProveedores = () => {
    history.push(PROVEEDORES_URL)
  }

  return (
    <div className={classes.root}>

      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={3}>
          
          {/* muestro la imagen que trae el candidato, si no tiene imagen uso una random */}
          {candidato && candidato.imagenUrl ? (
            <CardMedia
              className={classes.media}
              image={candidato.imagenUrl}
              title="Imagen de ejemplo obtenida random desde el backend"
            />
          ) : (
            <CardMedia
              className={classes.media}
              image='https://picsum.photos/200/200?random=1'
              title="Imagen de ejemplo obtenida random desde el backend"
            />
          )}
          
          <Typography variant="body1" color="textSecondary" paragraph align="center">
            Bienvenido {candidato.nombre}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className="btn btn-primary"
                onClick={goToListaProveedores}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* <Footer version={getVersion()}/> */}
        <Footer version={version}/>
      </Container>
    </div>
  )
}

export default HomePage
