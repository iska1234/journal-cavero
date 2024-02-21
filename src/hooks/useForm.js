import { useState, useEffect, useMemo } from 'react';

// Se crea un hook personalizado llamado 'useForm'.
export const useForm = (initialForm = {}, formValidations = {} ) => {
  
    // Se utiliza el useState de React para manejar el estado del formulario.
    const [formState, setFormState] = useState(initialForm);
    //la idea de este estado
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
      //cada que cambie va a llamar al createValidators
      createValidators();
      //es para dar con el formState
    }, [formState]);

    //cada que el initial form cambia se vuelve a establecer el formulario
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])
    

    //vamos a usar un useMemo porque quiero memorizar el valor
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation]);
    
    // Esta función maneja los cambios en los campos del formulario.
    const onInputChange = ({ target }) => {
        // Se extraen el 'name' y el 'value' del elemento que desencadenó el cambio.
        const { name, value } = target;
        
        // Se actualiza el estado del formulario con los valores anteriores y el nuevo valor.
        setFormState({
            ...formState,
            [name]: value
        });
    }

    // Esta función reinicia el formulario al estado inicial.
    const onResetForm = () => {
        // Establece el estado del formulario de vuelta a su estado inicial.
        setFormState(initialForm);
    }

    //va a tomar el objeto y crear un nuevo estado para saber si los input son validos
    const createValidators = () => {
        const formCheckedValues = {};

        //analizar nuestro objeto de validaciones
        for (const formField of Object.keys(formValidations)) {
            //funcion de validacion y error message
            const [fn, errorMessage = 'Este campo es requerido.'] = formValidations[formField];

            //Ejecutamos la funcion y le mandamos como argumento el valor que tenga ese input correspondiente
            //si la condicion se cumple entonces es null, pero si no se cumple y regresa un false entonces mostramos
            //el error message
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
        console.log(formCheckedValues);
    }

    // Devuelve un objeto con el estado actual del formulario y las funciones para manejarlo.
    return {
        ...formState, // Devuelve el estado actual del formulario.
        formState, // Una redundancia que devuelve el estado actual del formulario.
        onInputChange, // Función para manejar cambios en los campos del formulario.
        onResetForm, // Función para restablecer el formulario a su estado inicial.
        ...formValidation,
        isFormValid,
    }
}
