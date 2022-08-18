import {
    FETCH_SLIDE_IMG_REQUEST,
    FETCH_SLIDE_IMG_SUCCESS,
    FETCH_SLIDE_IMG_FAIL,
} from '../constants/slides';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: []
}

const slideReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_SLIDE_IMG_REQUEST:
            return {
                ...state,
                requesting: true,
            };
        case FETCH_SLIDE_IMG_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_SLIDE_IMG_FAIL:
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

export default slideReducer;