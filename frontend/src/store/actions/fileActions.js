import axios from 'axios';
import {
  FETCH_FILES_FAILURE,
  FETCH_FILES_REQUEST,
  FETCH_FILES_SUCCESS,
} from '../actionsTypes';

export const fetchFilesRequest = () => {
  return {
    type: FETCH_FILES_REQUEST,
  };
};

export const fetchFilesSuccess = (files) => {
  return {
    type: FETCH_FILES_SUCCESS,
    payload: files,
  };
};

export const fetchFilesFailure = (error) => {
  return {
    type: FETCH_FILES_FAILURE,
    payload: error,
  };
};

export const fetchFiles = () => {
  return (dispatch) => {
    dispatch(fetchFilesRequest());
    axios
      .get('http://localhost:3002/files/data')
      .then((response) => {
        const files = response.data;
        dispatch(fetchFilesSuccess(files));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchFilesFailure(errorMsg));
      });
  };
};
