import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rateService } from "../../shared/services/rateService";

export const PostLikeRoom = createAsyncThunk(
  "rate/PostLikeRoom",
  async (data) => {
    const res = await rateService.postLike(data);
    return res;
  }
);
export const GetLikeRoom = createAsyncThunk("rate/GetLikeRoom", async (id) => {
  const res = await rateService.getLike(id);
  // console.log("type like", res.data);
  return res.data;
});

const initialState = {
  arrLike: [],
  LikeRoom: [],
};
export const actionSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PostLikeRoom.fulfilled, (state, action) => {
      // console.log("action: ", action.payload);
    });
    builder.addCase(GetLikeRoom.fulfilled, (state, action) => {
      // console.log("action: ", action.payload);
      state.LikeRoom = action.payload;
    });
  },
});

export const {} = actionSlice.actions;
// để sử dụng trong component

export default actionSlice.reducer;
// import trong store của redux
