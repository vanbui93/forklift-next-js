import {
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAIL,
    DELETE_ORDER_OBJECT,
} from './../constants/order';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const orderReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_ORDER_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message
            };
        case DELETE_ORDER_OBJECT:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default orderReducer;