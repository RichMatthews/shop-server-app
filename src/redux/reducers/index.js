import { combineReducers } from 'redux';
import bag from './bag';
import modal from './modal';
import currentProduct from './currentProduct';
import loading from './loading';

const rootReducer = combineReducers({
  bag,
  modal,
  currentProduct,
  loading,
});

export default rootReducer;
