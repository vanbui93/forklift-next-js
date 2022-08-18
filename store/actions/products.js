import { onValue, query, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_PRODUCT_OBJECT,
  DELETE_PRODUCT_OBJECT,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  UPDATE_IMGs_PRODUCT_OBJECT,
  UPDATE_PRODUCT_OBJECT,
} from '../constants/products'

//load sản phẩm
export const getProduct = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST })

    const productRef = query(ref(db, `products`))
    onValue(
      productRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null && snapshot.val !== undefined) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
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
      type: FETCH_PRODUCTS_FAIL,
      message: error,
    })
  }
}

//Xóa sản phẩm
export const deleteProduct = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_PRODUCT_OBJECT,
    })

    const productDelete = ref(db, `products/${id}`)
    remove(productDelete)
      .then(() => {
        alert('Đã xóa sản phẩm thành công')
      })
      .catch(error => {
        alert('Có lỗi xảy ra :' + error)
      })
  } catch (error) {
    console.log(error)
  }
}

//Update sản phẩm
export const updateProduct = product => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_OBJECT,
    })

    const productUpdate = ref(db, `products/${product.id}`)
    const valueUpdate = {
      ...product,
      update_date: new Date().toString().replace(/GMT.*/g, ''),
    }
    update(productUpdate, valueUpdate)
      .then(() => {})
      .catch(error => {
        alert('Có lỗi xảy ra :' + error)
      })
  } catch (error) {
    console.log(error)
  }
}

//Update hình sản phẩm
export const updateImgProduct = (id, images) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_IMGs_PRODUCT_OBJECT,
    })
    const productImgRef = ref(db, `products/${id}`)
    update(productImgRef, {
      images: images,
    })
  } catch (error) {
    console.log(error)
  }
}

//Thêm sản phẩm
export const addProductObject = (product, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_PRODUCT_OBJECT,
    })

    set(ref(db, 'products/' + id), product).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
