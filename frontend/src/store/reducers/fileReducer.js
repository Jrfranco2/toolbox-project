// import {
//   FETCH_FILES_REQUEST,
//   FETCH_FILES_SUCCESS,
//   FETCH_FILES_FAILURE,
// } from '../actionTypes';

import {
  FETCH_FILES_FAILURE,
  FETCH_FILES_REQUEST,
  FETCH_FILES_SUCCESS,
} from '../actionsTypes';

const initialState = {
  loading: false,
  files: [],
  error: '',
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FILES_SUCCESS:
      return {
        loading: false,
        files: action.payload,
        error: '',
      };
    case FETCH_FILES_FAILURE:
      return {
        loading: false,
        files: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
