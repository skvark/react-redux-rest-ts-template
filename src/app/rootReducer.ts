import { combineReducers } from '@reduxjs/toolkit';
import { reducer as usersReducer } from '../ducks/usersDuck';

const rootReducer = () =>
  combineReducers({
    users: usersReducer
  });

export default rootReducer;
