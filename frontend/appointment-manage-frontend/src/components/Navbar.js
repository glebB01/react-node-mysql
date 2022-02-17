import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const history = useHistory();
    const logout = (e) =>{
        e.preventDefault();
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
                <Link className="nav-link text-white" to="/">Home <span className="sr-only">(current)</span></Link>
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                <Link className="nav-link text-white" to="/login">Login</Link>
                <Link className="nav-link text-white" to='/' onClick={(e) => logout(e)}>Logout</Link>
            </form>
        </nav>
    )
}

export default Navbar;