import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { REQUEST_HOSPITAL, RECEIVE_HOSPITAL } from "./actions";

const hospital = (state = { isFetching: false, email: "", item: {} }, action) => {
    switch(action.type) {
        case REQUEST_HOSPITAL:
            return {
                ...state,
                isFetching: true,
                email: action.email
            };
        case RECEIVE_HOSPITAL:
            return {
                ...state,
                isFetching: false,
                item: action.hospital
            };
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    form: formReducer,
    hospital
});