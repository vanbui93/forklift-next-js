import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../utils/firebase'

import {
    FETCH_STORAGE_FAIL,
    FETCH_STORAGE_REQUEST,
    FETCH_STORAGE_SUCCESS,
    DELETE_STORAGE_OBJECT,
} from '../constants/mediaStorage'

//gọi api firebase
export const getMediaStorage = () => async dispatch => {
    try {
        dispatch({ type: FETCH_STORAGE_REQUEST })

        const storageRef = ref(storage, 'media')
        listAll(storageRef)
            .then(res => {
                let promises = res.items.map(imageRef => getDownloadURL(imageRef))
                Promise.all(promises).then(urls => {
                    dispatch({
                        type: FETCH_STORAGE_SUCCESS,
                        data: urls,
                    })
                })
            })
            .catch(err => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_STORAGE_FAIL,
            message: error,
        })
    }
}

// //Xóa STORAGE
export const deleteMediaStorage = itemFile => async dispatch => {
    try {
        dispatch({
            type: DELETE_STORAGE_OBJECT,
        })
        const deletePhotoRef = ref(storage, itemFile)
        deleteObject(deletePhotoRef)
            .then(() => {
                console.log('File deleted successfully')
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error)
    }
}
