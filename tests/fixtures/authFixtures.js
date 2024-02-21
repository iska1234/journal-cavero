export const initialState = {
    status: 'checking', // Estado inicial: checking
    uid: null, // Identificador de usuario
    email: null, // Correo electrónico
    displayName: null, // Nombre de usuario
    photoURL: null, // URL de la foto del usuario
    errorMessage: null, // Mensaje de error
}

export const authenticatedState = {
    status: 'authenticated', // Estado inicial: autenticado
    uid: '123ABC', // Identificador de usuario
    email: 'demo@google', // Correo electrónico
    displayName: 'Demo User', // Nombre de usuario
    photoURL: 'https://demo.jpg', // URL de la foto del usuario
    errorMessage: null, // Mensaje de error
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // Estado inicial: no autenticado
    uid: null, // Identificador de usuario
    email: null, // Correo electrónico
    displayName: null, // Nombre de usuario
    photoURL: null, // URL de la foto del usuario
    errorMessage: null, // Mensaje de error
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@google',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
}