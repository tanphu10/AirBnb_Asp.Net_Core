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
    return https.get(`/api/admin/room/paging/${data}`);
  },
};
