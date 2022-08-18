import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_MENUS_OBJECT,
  DELETE_MENUS_OBJECT,
  FETCH_MENUS_FAIL,
  FETCH_MENUS_REQUEST,
  FETCH_MENUS_SUCCESS,
  UPDATE_MENUS_OBJECT,
} from '../constants/menus'

//gọi api firebase
export const getMenu = () => async dispatch => {
  try {
    dispatch({ type: FETCH_MENUS_REQUEST })

    const menuRef = ref(db, 'menus')
    onValue(
      menuRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_MENUS_SUCCESS,
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
      type: FETCH_MENUS_FAIL,
      message: error,
    })
  }
}

//Thêm menu
export const addMenuObject = (menu, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_MENUS_OBJECT,
    })

    set(ref(db, 'menus/' + id), menu).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa menu
export const deleteMenu = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_MENUS_OBJECT,
    })

    const menuDelete = ref(db, `menus/${id}`)
    remove(menuDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update menu
export const updateMenu = menu => async dispatch => {
  try {
    dispatch({
      type: UPDATE_MENUS_OBJECT,
    })

    const menuUpdate = ref(db, `menus/${menu.id}`)
    update(menuUpdate, menu).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
