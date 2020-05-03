import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import {useHistory} from 'react-router-dom';
import './login-form.css'
import {PropsType} from "./types";
import { History } from 'history';

const LoginForm: FC<PropsType> = (props: PropsType) => {
    let [email, setEmail] = useState<string>('');
    let history = useHistory<History>();

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setEmail(value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        props.login(email, history)
    };

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <div className="form-field">
                <input
                    onChange={inputHandler}
                    type="text"
                    name='email'
                    id='email'
                    required
                    autoComplete='off'
                    value={email}/>
                <label htmlFor="email">Put your email</label>
            </div>
            <div className="form-field d-flex justify-content-center mt-4">
                <button className='btn btn-success'>Login</button>
            </div>
        </form>
    )
};

export default LoginForm