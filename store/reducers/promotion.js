import {
    FETCH_PROMOTIONS_REQUEST,
    FETCH_PROMOTIONS_SUCCESS,
    FETCH_PROMOTIONS_FAIL,
} from '../constants/promotion';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const promotionReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PROMOTIONS_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_PROMOTIONS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_PROMOTIONS_FAIL:
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

export default promotionReducer;