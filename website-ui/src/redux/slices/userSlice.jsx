import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "../../services/commentService";
import { getUser } from "../../shared/function/token-storage";
import { userService } from "../../services/userService";

export const userCMTAPI = createAsyncThunk("user/userCMTAPI", async (id) => {
  const res = await commentService.getCommentRoom(id);
  return res.data;
});

export const getInfoUserApi = createAsyncThunk(
  "users/getInfoUserApi",
  async (id) => {
    const res = await userService.getInfoUser(id);
    // console.log(res);
    return res.data;
  }
);

export const editAvatarApi = createAsyncThunk(
  "users/editAvatarApi",
  async (data) => {
    // console.log(data);
    let file = data;
    let formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    try {
      const res = await userService.editAvatar(formData);
      alert("upload thành công");
      return res.data.content;
    } catch (error) {
      alert(error);
    }
    // console.log(res);
  }
);

// lần đầu tiên người ta vào trang web store sẽ được khởi tạo
const initialState = {
  inFo: getUser(),
  ObUser: [],
  editAvt: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDataName: (state, action) => {
      if (state.inFo == null) {
        state.inFo = action.payload;
      } else if (action.payload == null) {
        state.inFo = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userCMTAPI.fulfilled, (state, action) => {
      state.arrUersCMT = action.payload;
    });

    builder.addCase(getInfoUserApi.fulfilled, (state, action) => {
      state.ObUser = action.payload;
    });
    builder.addCase(editAvatarApi.fulfilled, (state, action) => {
      // console.log(state.ObUser);
      state.ObUser = action.payload;
    });
  },
});
export const { setDataName } = userSlice.actions;
export default userSlice.reducer;
