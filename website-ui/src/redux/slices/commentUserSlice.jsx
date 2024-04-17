import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "../../services/commentService";

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
      const res = await commentService.editComment(data.id, data);
      return res.data;
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
  name: "room",
  initialState,
  reducers: {
    // layDataSetComment: (state, action) => {
    //   state.arrComment.find((item) => {
    //     if (item.id == action.payload) {
    //       state.arrSetComment.push(item);
    //               }
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCommentApi.fulfilled, (state, action) => {
      state.arrCommentMaPhong = action.payload;
    });
    builder.addCase(getCommentRoom.fulfilled, (state, action) => {
      state.arrComment = action.payload;
      // console.log("arrComment=>>>redux",state.arrComment)
    });
    builder.addCase(getCommentId.fulfilled, (state, action) => {
      // state.arrComment=[]
      state.arrSetComment = action.payload;
      console.log("action", action.payload);
    });
    builder.addCase(postCommentApi.fulfilled, (state, action) => {
      state.arrComment.push(action.payload);
      console.log("arrComment: ", state.arrComment);
    });
    builder.addCase(editCommentApi.fulfilled, (state, action) => {
      console.log("action: ", action.payload);
      let index = state.arrComment.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index != -1) {
        state.arrComment[index] = action.payload;
      }
      state.arrSetComment = [];
    });
  },
});
export const { findRoomUser, layDataSetComment } = commentUserSlice.actions;
// để sử dụng trong component
export default commentUserSlice.reducer;
// import trong store của redux
