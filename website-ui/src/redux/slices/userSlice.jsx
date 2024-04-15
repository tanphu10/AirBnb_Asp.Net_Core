import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { commentService } from "../../services/commentService";

import { layDuLieuLocal } from "../../util/localStorage";

export const userCMTAPI = createAsyncThunk("user/userCMTAPI", async (id) => {
  const res = await commentService.getCommentRoom(id);
  return res.data.content;
});
// lần đầu tiên người ta vào trang web store sẽ được khởi tạo
const initialState = {
  inFo: layDuLieuLocal("user"),
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ở đây  chúng ta tạo một phương thức giúp sử lí state bên trên store redux
    setDataName: (state, action) => {
      //  check xem hoTen có dữ liệu hay không nếu không có set dữ liệu cho nó
      if (state.inFo == null) {
        state.inFo = action.payload;
      } else if (action.payload == null) {
        state.inFo = action.payload;
      }
      // state.inFo == action.payload;
      // console.log(" state.inFo", state.inFo);
      // ở đây khi lần đầu đăng nhập vào bên trong trang web thì dữ liệu trên local chưa có nên chúng ta sẽ lấy dữ liệu state.hoTen gán cho nó dữ liệu action.payload mà người dùng đăng nhập vào
      // payload== tất cả các dữ liệu mà người dùng đăng nhập vào để gửi lên redux
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userCMTAPI.fulfilled, (state, action) => {
      state.arrUersCMT = action.payload;
      // console.log("arrUersCMT: ", state.arrUersCMT);
    });
  },
});
// phương thức giúp cho chúng ta đem vào sài ở phương thức component
export const { setDataName } = userSlice.actions;
// giúp chúng ta import vào bên trong store redux
export default userSlice.reducer;
