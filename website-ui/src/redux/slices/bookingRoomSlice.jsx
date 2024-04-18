import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { roomServ } from "./../../shared/services/roomServices";
import { userService } from "./../../shared/services/userService";

export const PostBookRoomApi = createAsyncThunk(
  "book/PostBookRoomApi",
  async (infoBooking) => {
    console.log("infoBooking", infoBooking);
    try {
      const res = await roomServ.postControlBook(infoBooking);
      // document.getElementById("guestNumber").value = "";
      console.log(res);
      alert("yêu cầu thanh toán tiền");
      return res;
    } catch (error) {
      alert("Đặt phòng thất bại");
      console.log("error", error);
    }
  }
);

const initialState = {
  ListRoom: [],
};
export const bookingRoomSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PostBookRoomApi.fulfilled, (state, action) => {
      state.ListRoom = action.payload;
      // console.log("state.payload: ", action.payload);
      // console.log("state.ListRoom: ", state.ListRoom);
    });
  },
});

export const {} = bookingRoomSlice.actions;
// để sử dụng trong component
export default bookingRoomSlice.reducer;
// import trong store của redux
