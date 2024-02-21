import { createSlice } from '@reduxjs/toolkit';

// Crea un slice de Redux para la autenticación
export const authSlice = createSlice({
    name: 'auth', // Nombre del slice
    initialState: {
        status: 'checking', // Estado inicial: no autenticado
        uid: null, // Identificador de usuario
        email: null, // Correo electrónico
        displayName: null, // Nombre de usuario
        photoURL: null, // URL de la foto del usuario
        errorMessage: null, // Mensaje de error
    },
    reducers: {
        login: (state, {payload}) => {
            // Acción de inicio de sesión
            state.status = 'authenticated'; // Estado inicial: no autenticado
            state.uid = payload.uid; // Identificador de usuario
            state.email = payload.email; // Correo electrónico
            state.displayName = payload.displayName; // Nombre de usuario
            state.photoURL = payload.photoURL; // URL de la foto del usuario
            state.errorMessage = null; // Mensaje de error
        },
        logout: (state, {payload}) => {
            // Acción de cierre de sesión
            state.status = 'not-authenticated'; // Estado inicial: no autenticado
            state.uid = null; // Identificador de usuario
            state.email = null; // Correo electrónico
            state.displayName = null; // Nombre de usuario
            state.photoURL = null; // URL de la foto del usuario
            state.errorMessage = payload?.errorMessage; // si viene el payload busca el error message, si no viene no hace nada
        },
        checkingCredentials: (state) => {
            // Acción para verificar credenciales
            state.status = 'checking'; // Cambia el estado a 'verificando'
        }
    }
});

// Exporta las acciones para ser utilizadas en otras partes de la aplicación
export const { login, logout, checkingCredentials } = authSlice.actions;