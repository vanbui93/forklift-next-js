import { FETCH_STORAGE_REQUEST, FETCH_STORAGE_SUCCESS, FETCH_STORAGE_FAIL } from '../constants/mediaStorage'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const storageReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_STORAGE_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_STORAGE_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_STORAGE_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        default:
            return state
    }
}

export default storageReducer
