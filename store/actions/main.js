import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_MAIN_OBJECT,
  DELETE_MAIN_OBJECT,
  FETCH_MAIN_FAIL,
  FETCH_MAIN_REQUEST,
  FETCH_MAIN_SUCCESS,
  UPDATE_MAIN_OBJECT,
} from '../constants/main'

//gọi api firebase
export const getMain = () => async dispatch => {
  try {
    dispatch({ type: FETCH_MAIN_REQUEST })

    const mainRef = ref(db, 'main')
    onValue(
      mainRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_MAIN_SUCCESS,
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
      type: FETCH_MAIN_FAIL,
      message: error,
    })
  }
}

//Thêm main
export const addMainObject = (main, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_MAIN_OBJECT,
    })

    set(ref(db, 'main/' + id), main).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa main
export const deleteMain = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_MAIN_OBJECT,
    })

    const mainDelete = ref(db, `main/${id}`)
    remove(mainDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update main
export const updateMain = main => async dispatch => {
  try {
    dispatch({
      type: UPDATE_MAIN_OBJECT,
    })

    const mainUpdate = ref(db, `main`)
    update(mainUpdate, main).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
