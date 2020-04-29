import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import './login-form.css'

const LoginForm = (props) => {
    let [email, setEmail] = useState('');
    let history = useHistory();
    const inputHandler = (e) => {
        let value = e.target.value;
        setEmail(value);
    };

    const handleSubmit = async (e) => {
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