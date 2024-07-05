import { combineReducers } from 'redux';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  fileData: fileReducer,
});

export default rootReducer;
