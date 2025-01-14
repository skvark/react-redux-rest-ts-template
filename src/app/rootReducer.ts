import { combineReducers } from '@reduxjs/toolkit';
import { reducer as objectsReducer } from '../ducks/objectsDuck';

const rootReducer = combineReducers({
  objects: objectsReducer
});

export default rootReducer;
