import {
    FETCH_MAIN_REQUEST,
    FETCH_MAIN_SUCCESS,
    FETCH_MAIN_FAIL,
} from '../constants/main';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: []
}

const mainReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_MAIN_REQUEST:
            return {
                ...state,
                requesting: true,
            };
        case FETCH_MAIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_MAIN_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message
            };
        default:
            return state;
    }
}

export default mainReducer;