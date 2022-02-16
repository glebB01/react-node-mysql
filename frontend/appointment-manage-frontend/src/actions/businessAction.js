import axios from 'axios';
import bcrypt from 'bcryptjs';
import { GET_BUSINESS } from './type';

var salt = bcrypt.genSaltSync(10);

export const businessGet = () => dispatch => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:5000/business',{
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.status) return ;
        dispatch({
            type: GET_BUSINESS,
            payload: {businessArr: res.data.response}
        })
    })
}

export const businessLogin = (history, businessdata) => {
    const pwd = bcrypt.hashSync(businessdata.password, salt);
    axios.post('http://127.0.0.1:5000/business/login', {  
        businessname: businessdata.businessname,
        password: pwd,
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('business_id', res.data.id);
            history.push({
                pathname: '/business-dashboard'
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

export const businessRegister = (history, businessdata) => {
    if(businessdata.confirm_password === businessdata.password) {
        axios.post('http://192.168.1.75:5000/business/register', {
            businessname: businessdata.businessname,
            password: businessdata.password,
            service: businessdata.businessname
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