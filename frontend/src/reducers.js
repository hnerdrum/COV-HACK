import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import {REQUEST_HOSPITAL, RECEIVE_HOSPITAL, RECEIVE_DOCUMENTS, REQUEST_DOCUMENTS} from "./actions";

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

const documents = (state = { isFetching: false, query: "", items: [] }, action) => {
    switch(action.type) {
        case REQUEST_DOCUMENTS:
            return {
                ...state,
                isFetching: true,
                query: action.query
            };
        case RECEIVE_DOCUMENTS:
            return {
                ...state,
                isFetching: false,
                items: action.documents
            };
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    form: formReducer,
    hospital,
    documents
});