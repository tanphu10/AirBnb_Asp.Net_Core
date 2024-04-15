import { https } from "./config";

export const userService = {
  signin: (data) => {
    console.log(data)
    return https.post("/api/admin/auth", data);
  },
  signup: (data) => {
    return https.post("/api/admin/users", data);
  },
  roomUserBooked: (maNguoiDung) => {
    return https.get(`/api/bookroom/get-by-id/${maNguoiDung}`);
  },
};
