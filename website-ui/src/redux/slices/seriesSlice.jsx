import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { seriesService } from "../../shared/services/seriesService";

export const getSeriesApi = createAsyncThunk("room/getSeriesApi", async () => {
  const res = await seriesService.getAllSeries();
  // console.log(res.data);
  return res.data;
});
const initialState = {
  arraySeries: [],
};
export const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSeriesApi.fulfilled, (state, action) => {
      // state.arrayRoom = [];
      // console.log("actions", action.payload);
      state.arraySeries = action.payload;
    });
  },
});

export const {} = seriesSlice.actions;
// để sử dụng trong component

export default seriesSlice.reducer;
// import trong store của redux
