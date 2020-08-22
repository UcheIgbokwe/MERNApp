import { useCallback, useReducer } from 'react';

//state represents the current objects, while action represents the new object been fed at real time. 
//it is used to replace the current one.
const formReducer = (state, action) => {
    switch (action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    //callback is used to avoid an infinite loop. this way, InputHandler will be called only once.
    const InputHandler = useCallback(
        (id, value, isValid) => { 
            dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
        },[]
    );

    return [formState, InputHandler];
};
