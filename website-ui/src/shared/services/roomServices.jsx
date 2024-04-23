import { https } from "./config";
export const roomServ = {
  getAllRoom: () => {
    return https.get("/api/admin/room/all-room");
  },
  getDetailRoom: (id) => {
    return https.get(`/api/admin/room/${id}`);
  },

  getTypeRoom: () => {
    return https.get(`/api/type-room/all-type`);
  },
  getTypeRoomId: (id) => {
    return https.get(`/api/type-room/room-in-types/${id}`);
  },
  searchRoom: (data) => {
    // console.log(data);
    if (data.keyword) {
      return https.get(
        `/api/admin/room/paging?keyword=${data.keyword}&pageIndex=${
          data.pageIndex ? data.pageIndex : 1
        }&pageSize=${data.pageSize ? data.pageSize : 10}`
      );
    } else {
      return https.get(
        `/api/admin/room/paging?pageIndex=${
          data.pageIndex ? data.pageIndex : 1
        }&pageSize=${data.pageSize ? data.pageSize : 10}`
      );
    }
  },
};
