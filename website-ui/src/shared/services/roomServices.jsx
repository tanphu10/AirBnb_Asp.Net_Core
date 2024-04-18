import { https } from "./config";
export const roomServ = {
  getAllRoom: () => {
    return https.get("/api/admin/room/all-room");
  },
  getDetailRoom: (id) => {
    return https.get(`/api/admin/room/${id}`);
  },
  getAllBookRoom: () => {
    return https.get("/api/bookroom");
  },
  postControlBook: (data) => {
    return https.post("/api/admin/book-room", data);
  },
  deleteRoom: (id) => {
    return https.delete(`/api/bookroom/${id}`);
  },
  getTypeRoom: () => {
    return https.get(`/api/type-room/all-type`);
  },
  getTypeRoomId: (id) => {
    return https.get(`/api/type-room/${id}`);
  },
  searchRoom: (data) => {
    return https.get(`/api/admin/room/paging/${data}`);
  },
};