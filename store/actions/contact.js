import { onValue, ref, remove, set } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_CONTACT_FAIL,
    ADD_CONTACT_REQUEST,
    ADD_CONTACT_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    FETCH_CONTACT_FAIL,
    FETCH_CONTACT_REQUEST,
    FETCH_CONTACT_SUCCESS,
} from '../constants/contact'

//gọi api firebase
export const getContact = () => async dispatch => {
    try {
        dispatch({ type: FETCH_CONTACT_REQUEST })

        const contactRef = ref(db, 'contact')
        onValue(
            contactRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_CONTACT_SUCCESS,
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
            type: FETCH_CONTACT_FAIL,
            message: error,
        })
    }
}

//Thêm main
export const addContactInfo = (contact, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_CONTACT_REQUEST,
        })

        set(ref(db, 'contact/' + id), contact)
            .then(() => {
                dispatch({
                    type: ADD_CONTACT_SUCCESS,
                })
                alert('ขอบคุณสำหรับการติดต่อ')
            })
            .catch(error => {
                dispatch({
                    type: ADD_CONTACT_FAIL,
                })
                alert('เกิดข้อผิดพลาด :' + error)
            })
    } catch (error) {
        console.log(error)
    }
}

//Xóa contact
export const deleteContact = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_CONTACT_REQUEST,
        })

        const contactDelete = ref(db, `contact/${id}`)
        remove(contactDelete)
            .then(() => {
                dispatch({
                    type: DELETE_CONTACT_SUCCESS,
                })
            })
            .catch(error => {
                alert('เกิดข้อผิดพลาด:' + error)
                dispatch({
                    type: DELETE_CONTACT_FAIL,
                    message: error,
                })
            })
    } catch (error) {
        console.log(error)
    }
}
