import {
    FETCH_SKUS_REQUEST,
    FETCH_SKUS_SUCCESS,
    FETCH_SKUS_FAIL,
} from '../constants/skus';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const skusReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_SKUS_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_SKUS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_SKUS_FAIL:
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

export default skusReducer;