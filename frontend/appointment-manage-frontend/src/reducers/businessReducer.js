import { GET_BUSINESS } from "../actions/type";

const initialState = {
    businessArr: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BUSINESS:
            return {
                businessArr: action.payload.businessArr
            }
        default:
            return state;
    }
}