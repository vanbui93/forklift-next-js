import {
    FETCH_COLORS_REQUEST,
    FETCH_COLORS_SUCCESS,
    FETCH_COLORS_FAIL,
} from '../constants/colors';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const colorsReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_COLORS_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_COLORS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_COLORS_FAIL:
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

export default colorsReducer;