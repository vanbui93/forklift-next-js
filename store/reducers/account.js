import {
    ADD_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    FETCH_ACCOUNT_FAIL,
    FETCH_ACCOUNT_REQUEST,
    FETCH_ACCOUNT_SUCCESS,
    UPDATE_USER_SUCCESS,
} from '../constants/account'

const initialState = {
    requesting: false,
    success: false,
    message: false,
    data: null,
}

const accountReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_ACCOUNT_REQUEST:
            return {
                ...state,
                requesting: true,
            }
        case FETCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data,
            }
        case FETCH_ACCOUNT_FAIL:
            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message,
            }
        case DELETE_USER_SUCCESS:
            //Xóa data sau hành động xóa
            let deletedData = Object.values(state.data)?.filter(e => {
                return payload.id != e.id
            })
            return {
                ...state,
                requesting: false,
                success: true,
                data: deletedData,
            }
        case UPDATE_USER_SUCCESS:
            //update data sau hành động update
            const oldState = Object.values(state.data)?.filter(e => e.id != payload.user.id)
            const newState = [...oldState, payload.user]
            return {
                ...state,
                data: newState,
            }
        case ADD_USER_SUCCESS:
            //add data sau hành động add
            return {
                ...state,
            }
        default:
            return state
    }
}

export default accountReducer
