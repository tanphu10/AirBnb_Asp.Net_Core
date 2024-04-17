import { https } from "./config";

export const userService = {
  signin: (data) => {
    // console.log(data)
    return https.post("/api/admin/auth", data);
  },
  signup: (data) => {
    return https.post("/api/admin/users", data);
  },
  roomUserBooked: (maNguoiDung) => {
    return https.get(`/api/bookroom/get-by-id/${maNguoiDung}`);
  },
  user: () => {
    return https.get("/api/users");
  },
  getInfoUser: (id) => {
    return https.get(`/api/users/${id}`);
  },
  editAvatar: (data) => {
    console.log(data);
    return https.post("/api/users/upload-avatar", data);
  },
  adminUserIdPut: (id, data) => {
    return https.put(`/api/users/${id}`, data);
  },
};
