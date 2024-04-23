import { https } from "./config";

export const userService = {
  signin: (data) => {
    // console.log(data)
    return https.post("/api/admin/auth", data);
  },
  signup: (data) => {
    return https.post("/api/admin/users", data);
  },

  user: () => {
    return https.get("/api/users");
  },
  getInfoUser: (id) => {
    return https.get(`/api/admin/users/${id}`);
  },
  editAvatar: (data) => {
    // console.log(data);
    return https.post("/api/users/upload-avatar", data);
  },
  updateUser: (id, data) => {
    console.log("check data", data);
    return https.put(`/api/admin/users/${id}`, data);
  },
};
