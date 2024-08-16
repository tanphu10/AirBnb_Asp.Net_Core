import { https } from "./config";
export const rateService = {
  postLike: (data) => {
    // console.log("check like=>>>", data);
    var res = https.post("/api/admin/like", data);
    return res;
  },
  getLike: (id) => {
    // console.log("check like=>>>", id);
    return https.get(`/api/admin/like/room/${id}`);
  },
};
