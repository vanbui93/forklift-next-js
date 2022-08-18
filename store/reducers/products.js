import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    DELETE_PRODUCT_OBJECT,
} from '../constants/products';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null
}

const productReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                requesting: true
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message
            };
        case DELETE_PRODUCT_OBJECT:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default productReducer;