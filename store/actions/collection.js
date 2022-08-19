import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    ADD_COLLECTIONS_OBJECT,
    DELETE_COLLECTIONS_OBJECT,
    FETCH_COLLECTIONS_FAIL,
    FETCH_COLLECTIONS_REQUEST,
    FETCH_COLLECTIONS_SUCCESS,
    UPDATE_COLLECTIONS_OBJECT,
} from '../constants/collections'

//gọi api firebase
export const getCollection = () => async dispatch => {
    try {
        dispatch({ type: FETCH_COLLECTIONS_REQUEST })

        const collectionRef = ref(db, 'collections')
        onValue(
            collectionRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_COLLECTIONS_SUCCESS,
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
            type: FETCH_COLLECTIONS_FAIL,
            message: error,
        })
    }
}

//Thêm collection
export const addCollectionObject = (collection, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_COLLECTIONS_OBJECT,
        })

        set(ref(db, 'collections/' + id), collection).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}

//Xóa collection
export const deleteCollection = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_COLLECTIONS_OBJECT,
        })

        const collectionDelete = ref(db, `collections/${id}`)
        remove(collectionDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update collection
export const updateCollection = collection => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COLLECTIONS_OBJECT,
        })

        const collectionUpdate = ref(db, `collections/${collection.id}`)
        update(collectionUpdate, collection).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}
