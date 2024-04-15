import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    set_loading_started: (state, action) => {
      state.isLoading = true;
    },
    set_loading_end: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const { set_loading_started, set_loading_end } = loadingSlice.actions;
// để sử dụng trong component

export default loadingSlice.reducer;
