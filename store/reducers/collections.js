import { FETCH_COLLECTIONS_REQUEST, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAIL } from '../constants/collections'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: [],
}

const collectionReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_COLLECTIONS_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_COLLECTIONS_FAIL:
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

export default collectionReducer
