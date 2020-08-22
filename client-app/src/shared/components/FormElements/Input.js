import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validator';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return{
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: props.initialValue || '', isValid: props.initialValid || false, isTouched: false});
    //the value of the inputstate will need to be passed back to the textbox.

    //extract the relevant inputs that need to be recognised when changed.
    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        //dispatch carries the action, and values of the properties of action has to be specified.
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators })
    };

    //this will allow the user to make an attempt to type first before displaying an error message.
    const touchHandler = () => {
        dispatch({ type: 'TOUCH'})
    };

    //element helps to determine the type of input to be selected. It is then rendered in the div below.
    const element = props.element === 'input' ? ( <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} value={inputState.value} onBlur={touchHandler}/> ) 
    : ( <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} value={inputState.value} onBlur={touchHandler}/> )
    
    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
};

export default Input;
