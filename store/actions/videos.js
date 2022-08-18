import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from './../../utils/firebase'

import {
  ADD_VIDEOS_OBJECT,
  DELETE_VIDEOS_OBJECT,
  FETCH_VIDEOS_FAIL,
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  UPDATE_VIDEOS_OBJECT,
} from '../constants/videos'

//load sản phẩm
export const getVideo = () => async dispatch => {
  try {
    dispatch({ type: FETCH_VIDEOS_REQUEST })

    const videoRef = ref(db, 'videos')
    onValue(
      videoRef,
      async snapshot => {
        const snapshots = await snapshot.val()
        if (snapshot.val() !== null && snapshot.val !== undefined) {
          dispatch({
            type: FETCH_VIDEOS_SUCCESS,
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
      type: FETCH_VIDEOS_FAIL,
      message: error,
    })
  }
}

//Thêm video
export const addVideoObject = (video, id) => async dispatch => {
  try {
    dispatch({
      type: ADD_VIDEOS_OBJECT,
    })

    const valueUpdate = {
      ...video,
      video_id: id,
    }

    set(ref(db, 'videos/' + id), valueUpdate).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Xóa video
export const deleteVideo = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_VIDEOS_OBJECT,
    })

    const videoDelete = ref(db, `videos/${id}`)
    remove(videoDelete).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}

//Update video
export const updateVideo = video => async dispatch => {
  try {
    dispatch({
      type: UPDATE_VIDEOS_OBJECT,
    })

    const videoUpdate = ref(db, `videos/${video.id}`)
    update(videoUpdate, video).catch(error => {
      alert('Có lỗi xảy ra :' + error)
    })
  } catch (error) {
    console.log(error)
  }
}
