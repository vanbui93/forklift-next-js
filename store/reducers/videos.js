import {
    FETCH_VIDEOS_REQUEST,
    FETCH_VIDEOS_SUCCESS,
    FETCH_VIDEOS_FAIL,
} from '../constants/videos';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const videosReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_VIDEOS_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_VIDEOS_FAIL:
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

export default videosReducer;