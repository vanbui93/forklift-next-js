import {
    FETCH_PAGE_REQUEST,
    FETCH_PAGE_SUCCESS,
    FETCH_PAGE_FAIL,
} from '../constants/page';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const pageReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PAGE_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_PAGE_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_PAGE_FAIL:
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

export default pageReducer;