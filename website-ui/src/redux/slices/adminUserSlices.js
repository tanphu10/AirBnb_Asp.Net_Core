import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminUser } from "../../services/adminUser";
import { layDuLieuLocal } from "../../util/localStorage";
import { userService } from "../../services/userService";

export const getAllUser = createAsyncThunk("users/getAllUser", async () => {
  const res = await adminUser.user();
  // console.log("res", res);
  return res.data.content;
});
export const getAllLocation = createAsyncThunk(
  "user/getAllLocation",
  async () => {
    const res = await adminUser.getLocation();
    // console.log("reslocation", res);
    return res.data.content;
  }
);
export const getAllRent = createAsyncThunk("user/getAllRent", async () => {
  const res = await adminUser.adminGetAllRent();
  // console.log("result rent", res.content);
  return res.data.content;
});

export const getInfoUserApi = createAsyncThunk(
  "users/getInfoUserApi",
  async (id) => {
    const res = await adminUser.getInfoUser(id);
    // console.log(res);
    return res.data.content;
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
      const res = await adminUser.editAvatar(formData);
      alert("upload thành công");
      return res.data.content;
    } catch (error) {
      alert(error);
    }
    // console.log(res);
  }
);

const initialState = {
  userValue: [],
  admin: layDuLieuLocal("admin"),
  vitri: [],
  roomrent: [],
  getUser: [],
  editAvt: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adminRole: (state, action) => {
      if (state.admin == null) {
        state.admin = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.userValue = action.payload;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.userValue = [
        {
          name: "null",
          role: "null",
        },
      ];
    });
    builder.addCase(getAllLocation.fulfilled, (state, action) => {
      state.vitri = action.payload;
    });
    builder.addCase(getAllLocation.rejected, (state, action) => {
      state.vitri = [];
    });

    builder.addCase(getAllRent.fulfilled, (state, action) => {
      state.roomrent = action.payload;
      // console.log("state: ", state);
    });
    builder.addCase(getAllRent.rejected, (state, action) => {
      state.roomrent = [];
    });
    builder.addCase(getInfoUserApi.fulfilled, (state, action) => {
      state.getUser = action.payload;
      // console.log(state.getUser);
    });
    builder.addCase(editAvatarApi.fulfilled, (state, action) => {
      // console.log(state.getUser);
      state.getUser = action.payload;
    });
  },
});

export const { adminRole } = userSlice.actions;
export default userSlice.reducer;
