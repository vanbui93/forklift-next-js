import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import { FETCH_PROMOTIONS_REQUEST, FETCH_PROMOTIONS_SUCCESS, FETCH_PROMOTIONS_FAIL } from './../constants/promotion'

//load khuyến mãi
export const getPromotions = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROMOTIONS_REQUEST })

    const colorRef = ref(db, 'promotions')
    onValue(
      colorRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null && snapshot.val !== undefined) {
          dispatch({
            type: FETCH_PROMOTIONS_SUCCESS,
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
      type: FETCH_PROMOTIONS_FAIL,
      message: error,
    })
  }
}

//Thêm khuyến mãi
export const addPromotionObject = (promotion, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_PRODUCT_OBJECT,
    })

    const valueUpdate = {
      ...promotion,
      promotion_id: id,
    }

    set(ref(db, 'promotions/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa khuyến mãi
export const deletePromotion = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_PRODUCT_OBJECT,
    })

    const promotionDelete = ref(db, `promotions/${id}`)
    remove(promotionDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update promotion
export const updatePromotion = promotion => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_OBJECT,
    })

    const promotionUpdate = ref(db, `promotions/${promotion.id}`)
    update(promotionUpdate, promotion).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
