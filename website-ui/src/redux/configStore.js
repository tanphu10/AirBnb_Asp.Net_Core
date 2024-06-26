import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import roomSLices from "./slices/roomSLices";
import loadingSlice from "./slices/loadingSlice";
import bookingRoomSlice from "./slices/bookingRoomSlice";
import commentUser from "./slices/commentUserSlice";
// import {  } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSLices,
    loading: loadingSlice,
    booking: bookingRoomSlice,
    commentUser: commentUser,
  },
});
