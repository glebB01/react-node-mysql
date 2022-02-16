import React, { useState } from 'react';
import { useHistory } from "react-router";
import { userLogin } from '../actions/userAction';
import { businessLogin } from '../actions/businessAction';

const Login = (props) => {
    const history = useHistory();
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    const switchRegister = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/register'
        })
    }
    const login = (e) => {
        e.preventDefault();
        if(!e.target.elements.isBusiness.checked) userLogin(history, {username: username, password: password})
        else businessLogin(history, {businessname: username, password: password});
    }
    const onChange = (e) => {
        if(e.target.name == 'username') {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }
    return (
        <div>
            <div>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>Appointment Management System</h2>
                        <p>Login or register from here to access.</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-sm-12">
                        <div className="login-form">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label htmlFor="uname">Username:</label>
                                    <input type="text" className="form-control" id="uname" placeholder="Enter username" name="username" 
                                            onChange={onChange} value = {username} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" 
                                            onChange={onChange} value = {password} required />
                                </div>
                                <div className='form-group form-check'>
                                    <input type="checkbox" className='form-check-input' name="isBusiness" /> Are you a business?
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <button className="btn btn-dark ml-5" onClick={switchRegister}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;