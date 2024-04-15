import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import roomSLices from "./slices/roomSLices";
import adminUserSlices from "./slices/adminUserSlices";
import loadingSlice from "./slices/loadingSlice";
import bookingRoomSlice from "./slices/bookingRoomSlice";
import commentUser from "./slices/commentUserSlice";
// import {  } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    user: userSlice,
    adminUser: adminUserSlices,
    room: roomSLices,
    loading: loadingSlice,
    controlbooking: bookingRoomSlice,
    commentUser: commentUser,
  },
});
