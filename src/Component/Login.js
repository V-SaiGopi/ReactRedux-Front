import React, { useState } from "react";
import { unameValidator, passwordValidator } from './regexValidator';
import {useNavigate} from "react-router-dom";
import "./Login.css";


const Login = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        username : '',
        password : ''
    })

    const [errorMessage, seterrorMessage] = React.useState('');
	const [successMessage, setsuccessMessage] = React.useState('');

    const {username,password} = data;

    const handleChange = e => {
        e.preventDefault();
		setData({ ...data, [e.target.name]: e.target.value });
	};


    const formSubmitter = e => {
		e.preventDefault();
		setsuccessMessage('');
		if (!unameValidator(data.username)) return seterrorMessage('Please enter valid user id');

		if (!passwordValidator(data.password))
			return seterrorMessage(
				'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
			);
		//setsuccessMessage('Successfully Validated');
		if(data.username !== 'Sai.atos@1' || data.password !== 'Password@1') return seterrorMessage('Invalid username or password');
            
		navigate('/user')

	};


return (
    <div className="context">
        <div className="container">
            <div className='btn-group btn-group-lg d-flex gap-2' role="group" aria-label="...">
            <button type="button" className="btn btn-dark w-100 active">Home</button>
            <button type="button" className="btn btn-light w-100">Employees</button>
            <button type="button" className="btn btn-light w-100">Edit</button>
            <button type="button" className="btn btn-light w-100">Add</button>
            </div>
            <div className="form-login">
                <form className="login" onSubmit={formSubmitter}>
                    <span>Login</span><br />
                    {errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
                    {successMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>}
                    <label htmlFor="username" className="label">Username:</label>
                    <input type="text" name="username" placeholder="username" id="username" value={username} onChange={handleChange} />
                    <label htmlFor="password" className="label">Password:</label>
                    <input type="password" name="password" placeholder="password" id="password" value={password} onChange={handleChange}/><br />
                    <button className="text-decoration-none btn btn-sm btn-light" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
)

}

export default Login;