import React, { useState } from 'react';
import { useHistory } from "react-router";
import { userRegister } from '../actions/userAction';
import { businessRegister } from '../actions/businessAction';

const Register = () => {    
    const history = useHistory();
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [confirm_password, setConfPassword] = useState('');
    const register = (e) => {
        e.preventDefault();
        if(!e.target.elements.isBusiness.checked)  userRegister(history, {username: username, password: password, confirm_password: confirm_password})
        if(e.target.elements.isBusiness.checked)  businessRegister(history, {businessname: username, password: password, confirm_password: confirm_password})
    }
    const onChange = (e) => {
        if(e.target.name == 'username') setUsername(e.target.value);
        else if(e.target.name == 'password') setPassword(e.target.value);
        else if(e.target.name == 'confirm_password') setConfPassword(e.target.value);
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
                            <form onSubmit={register}>
                                <div className="form-group">
                                    <label htmlFor="uname">Username:</label>
                                    <input type="text" className="form-control" id="uname" placeholder="Enter username" name="username" 
                                            onChange={onChange} value = {username}  required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" 
                                            onChange={onChange} value = {password} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Confirm Password:</label>
                                    <input type="password" className="form-control" id="conf-pwd" placeholder="Enter Confirm password" name="confirm_password" 
                                            onChange={onChange} value = {confirm_password} required />
                                </div>
                                
                                <div className='form-group form-check'>
                                    <input type="checkbox" className='form-check-input' name="isBusiness" /> Are you a business?
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;