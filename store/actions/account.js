import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_USER_OBJECT,
  DELETE_USER_OBJECT,
  FETCH_ACCOUNT_FAIL,
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  UPDATE_USER_OBJECT,
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
      type: ADD_USER_OBJECT,
    })

    const valueUpdate = {
      ...user,
      user_id: id,
    }

    set(ref(db, 'users/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa user
export const deleteUser = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_USER_OBJECT,
    })

    const userDelete = ref(db, `users/${id}`)
    remove(userDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update user
export const updateUser = user => async dispatch => {
  try {
    dispatch({
      type: UPDATE_USER_OBJECT,
    })

    const userUpdate = ref(db, `users/${user.id}`)
    update(userUpdate, user).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
