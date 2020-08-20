import React, { useCallback } from 'react';

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validator'

const NewPlace = () => {
    //callback is used to avoid an infinite loop. this way, titleInputHandler will be called only once.
    const titleInputHandler = useCallback(
        (id, value, isValid) => { },[],
    );
    const descriptionInputHandler = useCallback(
        (id, value, isValid) => { },[],
    );

    return <form className="place-form"> 
        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]} errorText="Please enter a value" onInput={titleInputHandler}/>
        <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description." onInput={descriptionInputHandler}/>     
    </form>
};

export default NewPlace;
