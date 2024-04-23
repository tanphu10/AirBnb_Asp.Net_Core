import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "./../../shared/services/commentService";

export const getAllCommentApi = createAsyncThunk(
  "room/getAllCommentApi",
  async () => {
    try {
      const res = await commentService.getAllComment();
      return res.data;
    } catch (error) {
      alert("đã xảy ra lỗi");
    }
  }
);
export const getCommentRoom = createAsyncThunk(
  "room/getCommentRoomApi",
  async (id) => {
    try {
      const res = await commentService.getCommentRoom(id);
      return res.data;
    } catch (error) {
      alert("đã xảy ra lỗi");
    }
  }
);
export const getCommentId = createAsyncThunk(
  "room/getCommentId",
  async (id) => {
    try {
      const res = await commentService.getCommentId(id);
      console.log("comment by id", res.data);
      return res.data;
    } catch (error) {
      alert("đã xảy ra lỗi");
    }
  }
);
export const postCommentApi = createAsyncThunk(
  "room/postCommentApi",
  async (comment) => {
    console.log(comment);
    try {
      const res = await commentService.postComment(comment);
      document.getElementById("noiDung").value = "";
      return res.data;
    } catch (error) {
      alert("đã xảy ra lỗi");
    }
  }
);
export const editCommentApi = createAsyncThunk(
  "room/editCommentApi",
  async (data) => {
    console.log("redux data edi>>>", data);
    try {
      const res = await commentService.editComment(data);
      console.log(res);
      return res;
    } catch (error) {}
  }
);
const initialState = {
  arrComment: [],
  arrCommentMaPhong: [],
  arrSetComment: [],
  arrGetAvtUser: [],
};
export const commentUserSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCommentApi.fulfilled, (state, action) => {
      state.arrCommentMaPhong = action.payload;
    });
    builder.addCase(getCommentRoom.fulfilled, (state, action) => {
      state.arrComment = action.payload;
      // console.log("arrComment=>>>redux",state.arrComment)
    });
    builder.addCase(getCommentId.fulfilled, (state, action) => {
      state.arrSetComment = action.payload;
      console.log("action set arr", action.payload);
    });
    builder.addCase(postCommentApi.fulfilled, (state, action) => {
      console.log("action post comment", action);
      state.arrComment.push(action.payload);
      console.log("arrComment: ", state.arrComment);
    });
    builder.addCase(editCommentApi.fulfilled, (state, action) => {
      console.log("action edit: ", action);
      state.arrSetComment = [];
    });
  },
});
export const {} = commentUserSlice.actions;
// để sử dụng trong component
export default commentUserSlice.reducer;
// import trong store của redux
