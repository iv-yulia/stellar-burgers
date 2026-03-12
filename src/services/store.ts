import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/constructorSlice';
import feedsSlice from './slices/feedSlice';
import ordersSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';

//const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  builder: constructorSlice.reducer,
  feeds: feedsSlice.reducer,
  orders: ordersSlice.reducer,
  auth: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
