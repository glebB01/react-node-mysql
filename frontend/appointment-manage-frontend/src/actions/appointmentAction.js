import axios from 'axios';
import { 
    GET_AVAILABLE_TIME, 
    ADD_APPOINTMENT, 
    GET_USER_APPOINTMENT, 
    UPDATE_APPOINTMENT, 
    DELETE_APPOINTMENT,
    GET_BUSINESS_APPOINTMENT,
    ALLOW_APPOINTMENT,
    CANCEL_APPOINTMENT
} from './type';

export const getAvailableTime = (businessId, date) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post(`http://127.0.0.1:5000/appointment/business/${businessId}/${date}`,{},
    {
        headers: {
            'token': token
        }
    })
    .then(res => {
        dispatch({
            type: GET_AVAILABLE_TIME,
            payload: {availableTime: res.data.availableTime}
        })
    })
}

export const makeAppointment = (businessId, start, end) => dispatch => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('user_id');
    axios.post(`http://127.0.0.1:5000/appointment`,{
        UserId: userid,
        BusinessId: businessId,
        start: start,
        end: end
    },
    {
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.data.status) return ;
        dispatch({
            type: ADD_APPOINTMENT,
            payload: {addedData: res.data.response}
        })
    })
}

export const getUserAppointment = () => dispatch => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('user_id');
    axios.post(`http://127.0.0.1:5000/appointment/user/${userid}`,{},{
        headers: {
            'token': token
        }
    }).then(res => {
        if(!res.data.status) return ;
        dispatch({
            type:GET_USER_APPOINTMENT,
            payload: {data: res.data.response}
        })
    });
}

export const editAppointment = (appointId, businessId, start, end) => dispatch => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('user_id');
    axios.put(`http://127.0.0.1:5000/appointment/${appointId}`,{
        UserId: userid,
        BusinessId: businessId,
        start: start,
        end: end
    },
    {
        headers: {
            'token': token
        }
    })
    .then(res => {
        console.log(res.data);
        if(!res.data.status) return ;
        dispatch({
            type: UPDATE_APPOINTMENT,
            payload: {
                data: {
                    UserId: userid,
                    BusinessId: businessId,
                    start: start,
                    end: end
                },
                id: appointId
            }
        })
    })
}

export const deleteAppointment = (appointId) => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:5000/appointment/${appointId}`,
    {
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.data.status) return ;
        dispatch({
            type: DELETE_APPOINTMENT,
            payload: {id: appointId}
        })
    })
}

export const getBusinessAppointment = (businessId) => dispatch => {
    const token = localStorage.getItem('token');
    axios.post(`http://127.0.0.1:5000/appointment/business/${businessId}`,{},{
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.data.status) return ;
        dispatch({
            type: GET_BUSINESS_APPOINTMENT,
            payload: {
                data: res.data.response
            }
        })
    })
}

export const allowAppointment = (id) => dispatch => {
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:5000/appointment/allow/${id}`,{}, {
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.data.status) return ;
        dispatch({
            type: ALLOW_APPOINTMENT,
            payload: {
                id: id
            }
        })
    })
}

export const cancelAppointment = (id) => dispatch => {
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:5000/appointment/cancel/${id}`,{}, {
        headers: {
            'token': token
        }
    })
    .then(res => {
        if(!res.data.status) return ;
        dispatch({
            type: CANCEL_APPOINTMENT,
            payload: {
                id: id
            }
        })
    })
}