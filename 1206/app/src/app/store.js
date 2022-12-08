import { configureStore } from '@reduxjs/toolkit'
import darkSlice from '../features/dark/darkSlice'
import {topicApi} from './api';
import likeSlice from "../features/like/likeSlice";

export const store = configureStore({
  reducer: {
    [darkSlice.name]:darkSlice.reducer,
    [topicApi.reducerPath]:topicApi.reducer,
    [likeSlice.name]:likeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(topicApi.middleware),
})