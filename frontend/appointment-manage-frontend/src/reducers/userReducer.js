import { GET_USERDATA } from "../actions/type";

const initialState = {
    users: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERDATA:
            return {
                users: action.payload
            }
        default:
            return state;
    }
}