import { combineReducers } from "@reduxjs/toolkit";
import { Reducer } from "redux";

import { History, Location } from "history";
import { connectRouter, RouterState } from "connected-react-router";

import { reducer as usersReducer } from "../ducks/usersDuck";

const rootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    router: connectRouter(history) as Reducer<RouterState<Location>>,
  });

export default rootReducer;
