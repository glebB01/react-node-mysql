import axios from 'axios';
import bcrypt from 'bcryptjs';
import { GET_USERDATA } from './type';

var salt = bcrypt.genSaltSync(10);

export const getUserData = () => dispatch => {
    const token = localStorage.getItem('token');
    axios.post(`http://127.0.0.1:5000/user`,{},{
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.status) return ;
        dispatch({
            type: GET_USERDATA,
            payload: res.data.response
        })
    })
}

export const userLogin = (history, userdata) => {
    const pwd = bcrypt.hashSync(userdata.password, salt);
    console.log(pwd);
    axios.post('http://127.0.0.1:5000/user/login', {  
        username: userdata.username,
        password: pwd,
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_id', res.data.id);
            history.push({
                pathname: '/user-dashboard'
            })
        }).catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMessage) {
            alert(err.response.data.errorMessage);
            history.push({
                pathname: '/login'
            });
        }
    })
};

export const userRegister = (history, userdata) => {
    if(userdata.confirm_password === userdata.password) {
        axios.post('http://192.168.1.75:5000/user/register', {
            username: userdata.username,
            password: userdata.password
        }).then((res) => {
            history.push({
                pathname: '/login'
            });
        }).catch((err) => {
            alert(err.response.data.errorMessage);
            history.push({
                pathname: '/register'
            });
        })
    } else {
        alert("Confirm Password is not the same.");
    }
};