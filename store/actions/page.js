import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAIL,
  ADD_PAGE_OBJECT,
  DELETE_PAGE_OBJECT,
  UPDATE_PAGE_OBJECT,
} from '../constants/page'

//gọi api firebase

export const getPageDetail = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PAGE_REQUEST })

    const productRef = ref(db, `pages`)
    onValue(
      productRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_PAGE_SUCCESS,
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
      type: FETCH_PAGE_FAIL,
      message: error,
    })
  }
}

//Thêm page
export const addPageObject = (page, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_PAGE_OBJECT,
    })

    set(ref(db, 'pages/' + id), page).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa page
export const deletePageDetail = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_PAGE_OBJECT,
    })

    const pageDelete = ref(db, `pages/${id}`)
    remove(pageDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update page
export const updatePageDetail = page => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PAGE_OBJECT,
    })

    const pageUpdate = ref(db, `pages/${page.id}`)
    const valueUpdate = {
      ...page,
      update_date: new Date().toString().replace(/GMT.*/g, ''),
    }

    update(pageUpdate, valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
