import {useDispatch, useSelector} from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';


const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const dispatch = useDispatch();

  const {status ,errorMessage} = useSelector(state => state.auth);

  const { email, password, onInputChange } = useForm(formData);

  //Si el status cambia entonces se va a volver a obtener un nuevo valor
  //Si el status nunca cambia entonces no se vuelve a calcular el status
  const isAuthenticating = useMemo( () => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({ email, password });
    dispatch(startLoginWithEmailPassword({email, password}));
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__bounce animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              inputProps={{
                'data-testid': 'password'
              }}
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid display={ !!errorMessage ? '' : 'none'} container sx={{mt: 1}}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} aria-label="submit-form" type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} aria-label="google-btn" onClick={onGoogleSignIn} variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
