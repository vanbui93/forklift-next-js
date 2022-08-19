import { FETCH_BLOGS_REQUEST, FETCH_BLOGS_SUCCESS, FETCH_BLOGS_FAIL } from '../constants/blogs'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const blogReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_BLOGS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_BLOGS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_BLOGS_FAIL:
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

export default blogReducer
