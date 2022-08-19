import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAIL,
    ADD_BLOGS_OBJECT,
    DELETE_BLOGS_OBJECT,
    UPDATE_BLOGS_OBJECT,
} from '../constants/blogs'

//gọi api firebase

export const getBlog = () => async dispatch => {
    try {
        dispatch({ type: FETCH_BLOGS_REQUEST })

        const blogRef = ref(db, `blogs`)
        onValue(
            blogRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_BLOGS_SUCCESS,
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
            type: FETCH_BLOGS_FAIL,
            message: error,
        })
    }
}

//Thêm blog
export const addBlogObject = (blog, id) => async dispatch => {
    try {
        dispatch({
            type: ADD_BLOGS_OBJECT,
        })

        set(ref(db, 'blogs/' + id), blog).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}

//Xóa blog
export const deleteBlogDetail = id => async dispatch => {
    try {
        dispatch({
            type: DELETE_BLOGS_OBJECT,
        })

        const blogDelete = ref(db, `blogs/${id}`)
        remove(blogDelete).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}

//Update blog
export const updateBlogDetail = blog => async dispatch => {
    try {
        dispatch({
            type: UPDATE_BLOGS_OBJECT,
        })

        const blogUpdate = ref(db, `blogs/${blog.id}`)
        const valueUpdate = {
            ...blog,
            update_date: new Date().toString().replace(/GMT.*/g, ''),
        }

        update(blogUpdate, valueUpdate).catch(error => {
            alert('Có lỗi xảy ra :' + error)
        })
    } catch (error) {
        console.log(error)
    }
}
