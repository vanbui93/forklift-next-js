import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAIL,
} from '../constants/account';

const initialState = {
  requesting: false,
  success: false,
  message: false,
  data: null
}

const accountReducer = (state = initialState, payload) => {
  switch (payload.type) {
      case FETCH_ACCOUNT_REQUEST:
          return {
              ...state,
              requesting: true
          };
      case FETCH_ACCOUNT_SUCCESS:
          return {
              ...state,
              requesting: false,
              success: true,
              data: payload.data
          };
      case FETCH_ACCOUNT_FAIL:
          return {
              ...state,
              requesting: false,
              success: false,
              message: payload.message
          };
      default:
          return state;
  }
}

export default accountReducer;