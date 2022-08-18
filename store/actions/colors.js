import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_COLORS_OBJECT,
  DELETE_COLORS_OBJECT,
  FETCH_COLORS_FAIL,
  FETCH_COLORS_REQUEST,
  FETCH_COLORS_SUCCESS,
  UPDATE_COLORS_OBJECT,
} from '../constants/colors'

//load màu
export const getColors = () => async dispatch => {
  try {
    dispatch({ type: FETCH_COLORS_REQUEST })

    const colorRef = ref(db, 'product_color')
    onValue(
      colorRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null && snapshot.val !== undefined) {
          dispatch({
            type: FETCH_COLORS_SUCCESS,
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
      type: FETCH_COLORS_FAIL,
      message: error,
    })
  }
}

//Thêm color
export const addColorObject = (color, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_COLORS_OBJECT,
    })

    const valueUpdate = {
      ...color,
      color_id: id,
    }

    set(ref(db, 'product_color/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa color
export const deleteColor = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_COLORS_OBJECT,
    })

    const colorDelete = ref(db, `product_color/${id}`)
    remove(colorDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update color
export const updateColor = color => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COLORS_OBJECT,
    })

    const colorUpdate = ref(db, `product_color/${color.id}`)
    update(colorUpdate, color).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
