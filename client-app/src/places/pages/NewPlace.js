import React from 'react';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validator';
import { useForm } from '../../shared/hooks/form-hook';


const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        }, false
    );

   

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); //send the data to the backend
    };
    

    return <form className="place-form" onSubmit={placeSubmitHandler}> 
        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]} errorText="Please enter a value" onInput={inputHandler}/>
        <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description." onInput={inputHandler}/>
        <Input id="address" element="textarea" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid address." onInput={inputHandler}/> 
 
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>    
    </form>
};

export default NewPlace;
