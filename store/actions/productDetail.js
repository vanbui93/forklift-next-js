import { onValue, ref } from 'firebase/database'
import { db } from './../../utils/firebase'

import { FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from '../constants/productDetail'

//gọi api firebase

export const getProductDetail = id => async dispatch => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST })

    const productRef = ref(db, `products/${id}`)
    onValue(
      productRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_PRODUCT_SUCCESS,
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
      type: FETCH_PRODUCT_FAIL,
      message: error,
    })
  }
}
