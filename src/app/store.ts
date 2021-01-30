import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import rootReducer from './rootReducer';

declare const module: any;

export const history = createBrowserHistory();
const root = rootReducer();

export type RootState = ReturnType<typeof root>;

// Construct middleware list before configureStore call.
// Couldn't get this to work correctly directly in store middleware params
// because types were inferred incorrectly
const middlewares = [...getDefaultMiddleware<RootState>()];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = configureStore({
  reducer: root,
  middleware: middlewares
});

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
