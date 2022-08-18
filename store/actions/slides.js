import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  FETCH_SLIDE_IMG_REQUEST,
  FETCH_SLIDE_IMG_SUCCESS,
  FETCH_SLIDE_IMG_FAIL,
  DELETE_SLIDE_OBJECT,
  UPDATE_SLIDE_OBJECT,
  ADD_SLIDE_OBJECT,
} from '../constants/slides'

//gọi api firebase
export const getSlides = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SLIDE_IMG_REQUEST })

    const slideRef = ref(db, 'home_slide')
    onValue(
      slideRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null) {
          dispatch({
            type: FETCH_SLIDE_IMG_SUCCESS,
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
      type: FETCH_SLIDE_IMG_FAIL,
      message: error,
    })
  }
}

//Thêm slide
export const addSlideObject = (slide, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_SLIDE_OBJECT,
    })

    const valueUpdate = {
      ...slide,
      slide_id: id,
    }

    set(ref(db, 'home_slide/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa slide
export const deleteSlide = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_SLIDE_OBJECT,
    })

    const slideDelete = ref(db, `home_slide/${id}`)
    remove(slideDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update slide
export const updateSlide = slide => async dispatch => {
  try {
    dispatch({
      type: UPDATE_SLIDE_OBJECT,
    })

    const slideUpdate = ref(db, `home_slide/${slide.id}`)
    update(slideUpdate, slide).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
