import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookRoomService } from "./../../shared/services/bookRoomService";

export const PostBookRoomApi = createAsyncThunk(
  "book/PostBookRoomApi",
  async (infoBooking) => {
    console.log("infoBooking", infoBooking);
    try {
      const res = await bookRoomService.postControlBook(infoBooking);
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

export const GetBookRoomId = createAsyncThunk(
  "book/GetBookRoomId",
  async (id) => {
    console.log("id", id);
    const res = await bookRoomService.GetBookId(id);
    return res.data;
  }
);
export const PayCashToOwner = createAsyncThunk(
  "book/PayCashToOwner",
  async (pay) => {
    console.log("pay", pay);
    try {
      const res = await bookRoomService.PayRoomBooked(pay);
      console.log(res);
      alert("Thanh Toán Thành Công");
      return res;
    } catch (error) {
      alert("Thanh Toán Thất Bại");
      console.log("error", error);
    }
  }
);
const initialState = {
  ListRoom: [],
  BookRoomId: {},
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
  extraReducers: (builder) => {
    builder.addCase(GetBookRoomId.fulfilled, (state, action) => {
      state.BookRoomId = action.payload;
      // console.log("state.payload: ", state.BookRoomId);
    });
  },
});

export const {} = bookingRoomSlice.actions;
// để sử dụng trong component
export default bookingRoomSlice.reducer;
// import trong store của redux
