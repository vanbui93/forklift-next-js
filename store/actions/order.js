import { onValue, orderByKey, query, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_ORDER_OBJECT,
  DELETE_ORDER_OBJECT,
  FETCH_ORDER_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  UPDATE_ORDER_OBJECT,
} from '../constants/order'

//gọi api firebase
export const getOrder = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ORDER_REQUEST })
    const orderRef = query(ref(db, 'order'), orderByKey())
    onValue(
      orderRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_ORDER_SUCCESS,
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
      type: FETCH_ORDER_FAIL,
      message: error,
    })
  }
}

//Thêm đơn hàng
export const addMenuObject = (order, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_ORDER_OBJECT,
    })

    set(ref(db, 'order/' + id), order).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa đơn hàng
export const deleteOrder = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_ORDER_OBJECT,
    })

    const orderDelete = ref(db, `order/${id}`)
    remove(orderDelete)
      .then(() => {})
      .catch(error => {
        alert('Có lỗi xảy ra :' + error)
      })
  } catch (error) {
    console.log(error)
  }
}

//Update đơn hàng
export const updateOrder = order => async dispatch => {
  try {
    dispatch({
      type: UPDATE_ORDER_OBJECT,
    })

    const orderUpdate = ref(db, `order/${order.id}`)
    update(orderUpdate, order).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
