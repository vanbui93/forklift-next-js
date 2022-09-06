import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_OBJECT,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    FETCH_ACCOUNT_FAIL,
    FETCH_ACCOUNT_REQUEST,
    FETCH_ACCOUNT_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
} from '../constants/account'

//gọi api firebase
export const getUser = () => async dispatch => {
    try {
        dispatch({ type: FETCH_ACCOUNT_REQUEST })

        const accountRef = ref(db, 'users')
        onValue(
            accountRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_ACCOUNT_SUCCESS,
                        data: snapshots,
                    })
                }
            },
            {
                onlyOnce: true,
            }
        )
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_ACCOUNT_FAIL,
            message: error,
        })
    }
}

//Thêm user
export const addAccoutObject = (user, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_USER_REQUEST,
        })

        const valueUpdate = {
            ...user,
            id,
        }

        set(ref(db, 'users/' + id), valueUpdate)
            .then(() => {
                dispatch({
                    type: ADD_USER_SUCCESS,
                    user: valueUpdate,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ADD_USER_FAIL,
            message: error,
        })
    }
}

//Xóa user
export const deleteUser = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        })

        const userDelete = ref(db, `users/${id}`)
        remove(userDelete)
            .then(() => {
                dispatch({
                    type: DELETE_USER_SUCCESS,
                    id,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: DELETE_USER_FAIL,
            message: error,
        })
    }
}

//Update user
export const updateUser = user => async dispatch => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        })

        const userUpdate = ref(db, `users/${user.id}`)
        update(userUpdate, user)
            .then(() => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user,
                })
            })
            .catch(error => {
                alert('Có lỗi xảy ra :' + error)
            })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            message: error,
        })
    }
}
