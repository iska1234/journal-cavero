import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch} from 'react-redux';
import { login, logout } from '../store/auth/authSlice';
import { FirebaseAuth } from '../firebase/config';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();
  
    //Siempre vamos a estar pendientes del estado de la aplicacion
    useEffect(() => {
      
      //onAuthStateChange es una funcion que nos dice cuando el estado de la autenticacion cambia
      onAuthStateChanged(FirebaseAuth, async(user) => {
        //si no hay un usuario
        if(!user) return dispatch(logout());
  
        const {uid, email, displayName, photoURL} = user;
        dispatch(login({uid, email, displayName, photoURL}));
        dispatch(startLoadingNotes());
      })
    }, []);

    return status;
}
