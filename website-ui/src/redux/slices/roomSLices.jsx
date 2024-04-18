import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { roomServ } from "./../../shared/services/roomServices";
import { userService } from "./../../shared/services/userService";

export const getApiTypeRoom = createAsyncThunk(
  "room/getTypeRoomApi",
  async () => {
    // console.log("type")
    const res = await roomServ.getTypeRoom();
    // console.log("type redux",res.data);
    return res.data;
  }
);
export const getApiTypeRoomId = createAsyncThunk(
  "room/getTypeRoomApiId",
  async (id) => {
    const res = await roomServ.getTypeRoomId(id);
    // console.log(res);
    return res.data;
  }
);
export const getAllRoomAPI = createAsyncThunk(
  "room/getAllRoomAPI",
  async () => {
    const res = await roomServ.getAllRoom();
    // console.log(res);
    return res.data;
  }
);
export const getDetailRoomAPI = createAsyncThunk(
  "room/getDetailRoomAPI",
  async (id) => {
    // console.log("detail room",id)
    const res = await roomServ.getDetailRoom(id);
    return res.data;
  }
);
export const getRoomUserBookedApi = createAsyncThunk(
  "room/getRoomUserBookedApi",
  async (maNguoiDung) => {
    const res = await userService.roomUserBooked(maNguoiDung);
    // console.log(res);
    return res.data;
  }
);
export const putBookedRoomApi = createAsyncThunk(
  "room/putBookedRoomApi",
  async (data) => {
    // console.log(data);
    const res = await userService.adminPutRentId(data.id, data);
    // console.log(res);
    alert("bạn đã update thành công");
    return res.data;
  }
);
export const searchRoomApi = createAsyncThunk(
  "room/searchRoomApi",
  async (data) => {
    // console.log(data);
    const res = await roomServ.searchRoom(data);
    // console.log(res);
    return res.data;
  }
);
const initialState = {
  arrayRoom: [],
  room: {},
  controlRoom: [],
  arrRenderItem: [],
  editRoom: [],
  pickCashRenderEdit: [],
  arrTypeRoom: [],
};
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    findRoomBooker: (state, action) => {
      state.editRoom = [];
      // console.log(action.payload);
      state.controlRoom.find((item) => {
        if (item.id == action.payload) {
          state.editRoom.push(item);
        }
      });
      // console.log(state.editRoom);
    },
    findCashRoom: (state, action) => {
      state.pickCashRenderEdit = [];
      // console.log(action.payload);
      state.arrayRoom.find((item) => {
        // console.log(item);
        if (item.id == action.payload) {
          state.pickCashRenderEdit.push(item);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApiTypeRoom.fulfilled, (state, action) => {
      // console.log("action: ", action.payload);
      state.arrTypeRoom = action.payload;
      // dispatch(set_loading_end());
      // console.log(state.arrTypeRoom);
    });
    builder.addCase(getApiTypeRoomId.fulfilled, (state, action) => {
      state.arrayRoom = action.payload;
      // dispatch(set_loading_end());
      // console.log("arrRoom", state.arrayRoom);
    });

    builder.addCase(getAllRoomAPI.fulfilled, (state, action) => {
      // console.log("action: ", action.payload);
      state.arrayRoom = action.payload;
      // dispatch(set_loading_end());
      // console.log(state.arrayRoom);
    });
    // builder.addCase(getAllRoomAPI.pending, (state, action) => {
    //   dispatch(set_loading_started());
    // });
    builder.addCase(searchRoomApi.fulfilled, (state, action) => {
      state.arrayRoom = [];
      state.arrayRoom = action.payload;
    });

    builder.addCase(getDetailRoomAPI.fulfilled, (state, action) => {
      state.room = action.payload;
    });
    builder.addCase(getRoomUserBookedApi.fulfilled, (state, action) => {
      state.arrRenderItem = [];
      // console.log(state.arrRenderItem);
      state.controlRoom = action.payload;
      // console.log(action.payload);
      // console.log("controlRoom", state.controlRoom);
      state.controlRoom?.map((control) => {
        // console.log(control);
        state.arrayRoom?.map((room) => {
          // console.log(room);
          if (control.room_id === room.id) {
            state.arrRenderItem.push(room);
          }
        });
      });
      // console.log("controlRoom", state.controlRoom);
      // console.log(state.arrRenderItem);
    });
    builder.addCase(putBookedRoomApi.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      let index = state.controlRoom.findIndex(
        (item) => item.id == action.payload.id
      );
      state.controlRoom[index] = action.payload;
    });
  },
});

export const { findRoomBooker, findCashRoom } = roomSlice.actions;
// để sử dụng trong component

export default roomSlice.reducer;
// import trong store của redux
