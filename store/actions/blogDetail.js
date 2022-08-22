import { onValue, ref } from 'firebase/database'
import { db } from './../../utils/firebase'

import { FETCH_BLOG_DETAIL_FAIL, FETCH_BLOG_DETAIL_REQUEST, FETCH_BLOG_DETAIL_SUCCESS } from '../constants/blogDetail'

//gọi api firebase

export const getBlogDetail = slug => async dispatch => {
    try {
        dispatch({ type: FETCH_BLOG_DETAIL_REQUEST })

        const blogRef = ref(db, `blogs`)
        onValue(
            blogRef,
            async snapshot => {
                const snapshots = await snapshot.val()
                if (snapshot.val() !== null) {
                    dispatch({
                        type: FETCH_BLOG_DETAIL_SUCCESS,
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
            type: FETCH_BLOG_DETAIL_FAIL,
            message: error,
        })
    }
}
