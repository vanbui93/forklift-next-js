import { FETCH_CONTACT_REQUEST, FETCH_CONTACT_SUCCESS, FETCH_CONTACT_FAIL } from '../constants/contact'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const contactReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_CONTACT_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_CONTACT_FAIL:
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

export default contactReducer
