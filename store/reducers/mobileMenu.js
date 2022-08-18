import * as types from './../constants/mobileMenu';

const initialState = {
  showhamburger: false,
};

const mobileMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_HAMBUGER: {
      return {
        ...state,
        showhamburger: true,
      }
    }
    case types.HIDE_HAMBUGER: {
      return {
        ...state,
        showhamburger: false,
      }
    }
    default:
      return state
  }
}

export default mobileMenuReducer;