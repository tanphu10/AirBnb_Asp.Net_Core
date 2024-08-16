import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../shared/services/categoryService";

export const GetCategoryApi = createAsyncThunk(
  "room/GetCategoryApi",
  async () => {
    const res = await categoryService.getAllCategory();
    console.log(res.data);
    return res.data;
  }
);
const initialState = {
  arrayCate: [],
};
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCategoryApi.fulfilled, (state, action) => {
      // state.arrayRoom = [];
      console.log("cate", action.payload);
      state.arrayCate = action.payload;
    });
  },
});

export const {} = categorySlice.actions;
// để sử dụng trong component

export default categorySlice.reducer;
// import trong store của redux
