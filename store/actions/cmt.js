import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  FETCH_CMT_REQUEST,
  FETCH_CMT_SUCCESS,
  FETCH_CMT_FAIL,
  UPDATE_CMT_OBJECT,
  DELETE_CMT_OBJECT,
  ADD_CMT_OBJECT,
} from '../constants/cmt'

//gọi api firebase
export const getComments = () => async dispatch => {
  try {
    dispatch({ type: FETCH_CMT_REQUEST })

    const cmtRef = ref(db, 'comments')
    onValue(
      cmtRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_CMT_SUCCESS,
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
      type: FETCH_CMT_FAIL,
      message: error,
    })
  }
}

//Thêm cmt
export const addCommentObject = (cmt, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_CMT_OBJECT,
    })

    const valueUpdate = {
      ...cmt,
      cmt_id: id,
    }

    set(ref(db, 'comments/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa cmt
export const deleteComment = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_CMT_OBJECT,
    })

    const cmtDelete = ref(db, `comments/${id}`)
    remove(cmtDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update cmt
export const updateComment = cmt => async dispatch => {
  try {
    dispatch({
      type: UPDATE_CMT_OBJECT,
    })

    const cmtUpdate = ref(db, `comments/${cmt.id}`)
    update(cmtUpdate, cmt).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
