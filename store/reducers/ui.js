import * as types from './../constants/ui';

const initialState = {
  opensidebar: true,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.SHOW_SIDEBAR: {
        return {
          ...state,
          opensidebar: true,
        }
      }
      case types.HIDE_SIDEBAR: {
        return {
          ...state,
          opensidebar: false,
        }
      }
    default:
      return state
  }
}

export default uiReducer;