import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = (props) => {
    const history = useHistory();
    const logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem('user_id');
        localStorage.removeItem('business_id');
        localStorage.removeItem('token');
        console.log('asdf');
        history.push({
            pathname: '/'
        })
    }
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top justify-content-between">
            <a className="navbar-brand ">Appointment</a>
            <form className="form-inline">
                <a className="nav-link text-white" href="/">Home <span className="sr-only">(current)</span></a>
                <a className="nav-link text-white" href="/dashboard">Dashboard</a>
                <a className="nav-link text-white" href="/login">Login</a>
                <a className="nav-link text-white" href='/' onClick={(e) => logout(e)}>Logout</a>
            </form>
        </nav>
    )
}

export default Navbar;