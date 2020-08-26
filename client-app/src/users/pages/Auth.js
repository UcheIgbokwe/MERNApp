import React, { useState, useContext } from 'react';

import './Auth.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validator';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, false
    );

    //prevMode holds the previous mode in state and we can switch it.
    const switchModeHandler = () => {
        //set form data for the extra field provided depending on the mode selected.
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
        auth.login();
    }

    return(
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr/>
            <form onSubmit={authSubmitHandler}> 
                {!isLoginMode && <Input id="name" element="input" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name" onInput={inputHandler}/>}
                <Input id="email" element="input" type="email" label="Email" validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email" onInput={inputHandler}/>
                <Input id="password" element="input" type="password" label="Password" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid password." onInput={inputHandler}/>
        
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>    
            </form>
            <Button inverse onClick={switchModeHandler}>SWITCH TO{isLoginMode ? ' SIGNUP' : ' LOGIN'}</Button>
        </Card> 
    ); 
};

export default Auth;
