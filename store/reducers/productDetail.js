import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
} from '../constants/productDetail';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const productDetailReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_PRODUCT_FAIL:
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

export default productDetailReducer;