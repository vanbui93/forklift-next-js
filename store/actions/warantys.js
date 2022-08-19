import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_WARANTYS_OBJECT,
    DELETE_WARANTYS_OBJECT,
    FETCH_WARANTYS_FAIL,
    FETCH_WARANTYS_REQUEST,
    FETCH_WARANTYS_SUCCESS,
    UPDATE_WARANTYS_OBJECT,
} from '../constants/waranty'

//load video
export const getWarantys = () => async dispatch => {
    try {
        dispatch({ type: FETCH_WARANTYS_REQUEST })

        const warantyRef = ref(db, 'warantys')
        onValue(
            warantyRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null && snapshot.val !== undefined) {
                    dispatch({
                        type: FETCH_WARANTYS_SUCCESS,
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
            type: FETCH_WARANTYS_FAIL,
            message: error,
        })
    }
}

//Thêm video
export const addWarantyObject = (waranty, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_WARANTYS_OBJECT,
        })

        const valueUpdate = {
            ...waranty,
            waranty_id: id,
        }

        set(ref(db, 'warantys/' + id), valueUpdate).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}

//Xóa video
export const deleteWaranty = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_WARANTYS_OBJECT,
        })

        const videoDelete = ref(db, `warantys/${id}`)
        remove(videoDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update video
export const updateWaranty = video => async dispatch => {
    try {
        dispatch({
            type: UPDATE_WARANTYS_OBJECT,
        })

        const videoUpdate = ref(db, `warantys/${video.id}`)
        update(videoUpdate, video).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}
