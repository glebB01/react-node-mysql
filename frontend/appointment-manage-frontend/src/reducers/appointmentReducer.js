import { 
    GET_AVAILABLE_TIME, 
    ADD_APPOINTMENT, 
    GET_USER_APPOINTMENT, 
    UPDATE_APPOINTMENT, 
    DELETE_APPOINTMENT, 
    GET_BUSINESS_APPOINTMENT,
    ALLOW_APPOINTMENT,
    CANCEL_APPOINTMENT
} from "../actions/type";

const initialState = {
    availableTime: [],
    businessSchedule: [],
    userSchedule: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AVAILABLE_TIME:
            return {
                ...state,
                availableTime: action.payload.availableTime
            }
        case ADD_APPOINTMENT: {
            let userState = state.userSchedule;
            userState = [...userState, action.payload.addedData]
            return {...state, userSchedule: userState};
        }
        case GET_USER_APPOINTMENT: {
            return {...state, userSchedule: action.payload.data}
        }
        case UPDATE_APPOINTMENT: {
            return {...state, userSchedule: state.userSchedule.map(schedule => (schedule.id == action.payload.id ? {...schedule, ...action.payload.data} : schedule))}
        }
        case DELETE_APPOINTMENT: {
            return {...state, userSchedule: state.userSchedule.filter(schedule => (schedule.id != action.payload.id))};
        }
        case GET_BUSINESS_APPOINTMENT: {
            return {...state, businessSchedule: action.payload.data}
        }
        case ALLOW_APPOINTMENT: {
            return {...state, businessSchedule: state.businessSchedule.map(schedule => (schedule.id == action.payload.id ? 
                {...schedule, allowed: true} : 
                schedule))}
        }
        case CANCEL_APPOINTMENT: {
            return {...state, businessSchedule: state.businessSchedule.map(schedule => (schedule.id == action.payload.id ? 
                {...schedule, allowed: false} : 
                schedule))}
        }
        default:
            return state;
    }
}