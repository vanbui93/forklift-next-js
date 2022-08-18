import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  FETCH_SKUS_REQUEST,
  FETCH_SKUS_SUCCESS,
  FETCH_SKUS_FAIL,
  DELETE_SKUS_OBJECT,
  UPDATE_SKUS_OBJECT,
  ADD_SKUS_OBJECT,
} from '../constants/skus'

//load sản phẩm
export const getSkus = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SKUS_REQUEST })

    const skuRef = ref(db, 'product_sku')
    onValue(
      skuRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null && snapshot.val !== undefined) {
          dispatch({
            type: FETCH_SKUS_SUCCESS,
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
      type: FETCH_SKUS_FAIL,
      message: error,
    })
  }
}

//Thêm sku
export const addSkuObject = (sku, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_SKUS_OBJECT,
    })

    const valueUpdate = {
      ...sku,
      sku_id: id,
    }

    set(ref(db, 'product_sku/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa sku
export const deleteSku = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_SKUS_OBJECT,
    })

    const skuDelete = ref(db, `product_sku/${id}`)
    remove(skuDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update sku
export const updateSku = sku => async dispatch => {
  try {
    dispatch({
      type: UPDATE_SKUS_OBJECT,
    })

    const skuUpdate = ref(db, `product_sku/${sku.id}`)
    update(skuUpdate, sku).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
