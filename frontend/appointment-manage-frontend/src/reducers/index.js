import { combineReducers } from 'redux';
import businessReducer from './businessReducer.js'
import appointmentReducer from './appointmentReducer';
import userReducer from './userReducer.js';

export default combineReducers({
    businessState: businessReducer,
    appointmentState: appointmentReducer,
    userState: userReducer
});