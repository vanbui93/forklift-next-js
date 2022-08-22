import { FETCH_BLOG_DETAIL_REQUEST, FETCH_BLOG_DETAIL_SUCCESS, FETCH_BLOG_DETAIL_FAIL } from '../constants/blogDetail'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const blogDetailReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_BLOG_DETAIL_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_BLOG_DETAIL_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_BLOG_DETAIL_FAIL:
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

export default blogDetailReducer
