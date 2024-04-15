import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { roomServ } from "../../services/roomServices";
import { userService } from "../../services/userService";

export const getControlBookApi = createAsyncThunk(
  "book/getControlBookApi",
  async (infoBooking) => {
    console.log("infoBooking", infoBooking);
    try {
      const res = await roomServ.postControlBook(infoBooking);
      alert("Đặt phòng thành công");
      console.log(res);
      document.getElementById("guestNumber").value = "";
      // document.getElementById("ngayThang").value = "";
      return res.data;
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
    builder.addCase(getControlBookApi.fulfilled, (state, action) => {
      state.ListRoom = action.payload;
      // console.log("state.payload: ", action.payload);
      // console.log("state.ListRoom: ", state.ListRoom);
    });
    builder.addCase(getControlBookApi.rejected, (state, action) => {
      // console.log("action: ", action);
    });
  },
});

export const {} = bookingRoomSlice.actions;
// để sử dụng trong component
export default bookingRoomSlice.reducer;
// import trong store của redux
