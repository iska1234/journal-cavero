import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el AuthSlice', () => {
    test('Debe regresar el estado inicial y llamarse Auth', () => {
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);

    });

    test('debe de realizar la autenticacion', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })
    });

    test('debe de realizar el logout sin argumentos y mostrar un mensaje de error', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    })

    test('debe de realizar el logout sin argumentos y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking')
    })
});