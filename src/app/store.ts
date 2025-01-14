import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = process.env.NODE_ENV === 'development' ? [logger] : [];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares)
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;