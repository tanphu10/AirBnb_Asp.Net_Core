import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import roomSLices from "./slices/roomSLices";
import loadingSlice from "./slices/loadingSlice";
import bookingRoomSlice from "./slices/bookingRoomSlice";
import commentUser from "./slices/commentUserSlice";
import actionSlice from "./slices/actionSlice";
import seriesSlice from "./slices/seriesSlice";
import categorySlice from "./slices/categorySlice";
// import {  } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSLices,
    loading: loadingSlice,
    booking: bookingRoomSlice,
    commentUser: commentUser,
    rate: actionSlice,
    series: seriesSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["TYPE"],
        ignoredActionPaths: ["property"],
        ignoredPaths: ["reducer.property"],
      },
    }),
});
