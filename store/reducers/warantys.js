import {
    FETCH_WARANTYS_REQUEST,
    FETCH_WARANTYS_SUCCESS,
    FETCH_WARANTYS_FAIL,
} from '../constants/waranty';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const warantysReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_WARANTYS_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_WARANTYS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_WARANTYS_FAIL:
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

export default warantysReducer;