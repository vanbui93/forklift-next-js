import {
    FETCH_MENUS_REQUEST,
    FETCH_MENUS_SUCCESS,
    FETCH_MENUS_FAIL,
} from '../constants/menus';

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: []
}

const menuReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_MENUS_REQUEST:
            return {
                ...state,
                requesting: true,
            };
        case FETCH_MENUS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_MENUS_FAIL:
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

export default menuReducer;