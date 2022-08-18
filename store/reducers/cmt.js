import {
    FETCH_CMT_REQUEST,
    FETCH_CMT_SUCCESS,
    FETCH_CMT_FAIL,
} from '../constants/cmt';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: []
}

const cmtReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_CMT_REQUEST:
            return {
                ...state,
                requesting: true,
            };
        case FETCH_CMT_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_CMT_FAIL:
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

export default cmtReducer;