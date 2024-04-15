import { https } from "./config";

export const adminUser = {
  user: () => {
    return https.get("/api/users");
  },
  adminLogin: (data) => {
    return https.post("/api/auth/signin", data);
  },
  adminUserXoa: (data) => {
    return https.delete(`/api/users/${data}`);
  },
  adminUserThem: (data) => {
    return https.post("/api/users", data);
  },
  adminUserId: (id) => {
    return https.get(`/api/users/${id}`);
  },
  adminUserIdPut: (id, data) => {
    // console.log(data);
    // console.log(id);
    return https.put(`/api/users/${id}`, data);
  },
  getLocation: () => {
    return https.get("/api/location");
  },
  getLocationAdd: (data) => {
    return https.post("/api/location", data);
  },
  getLocationId: (id) => {
    return https.get(`/api/location/${id}`);
  },
  deleteLocationId: (id) => {
    return https.delete(`/api/location/${id}`);
  },
  putLocationId: (id, data) => {
    return https.put(`/api/location/${id}`, data);
  },
  deleteRoomId: (id) => {
    return https.delete(`/api/room/${id}`);
  },
  adminRoomThem: (data) => {
    console.log(data);
    return https.post("/api/room", data);
  },
  adminRoomId: (id) => {
    return https.get(`/api/room/${id}`);
  },
  adminRoomPutId: (id, data) => {
    return https.put(`/api/room/${id}`, data);
  },
  adminGetAllRent: () => {
    return https.get("/api/bookroom");
  },
  adminGetAllRentId: (id) => {
    return https.get(`/api/bookroom/${id}`);
  },
  adminDeleteRentId: (id) => {
    return https.delete(`/api/bookroom/${id}`);
  },
  adminPutRentId: (id, data) => {
    return https.put(`/api/bookroom/${id}`, data);
  },
  getInfoUser: (id) => {
    return https.get(`/api/users/${id}`);
  },
  editAvatar: (data) => {
    console.log(data);
    return https.post("/api/users/upload-avatar", data);
  },
};
