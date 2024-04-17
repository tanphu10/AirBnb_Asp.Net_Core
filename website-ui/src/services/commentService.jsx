import { https } from "./config";
export const commentService = {
  postComment: (data) => {
    return https.post("/api/user/comment", data);
  },
  getAllComment: () => {
    return https.get("/api/user/comment/all");
  },
  getCommentRoom: (id) => {
    // console.log("roomId",id)
    return https.get(`/api/user/comment/room/${id}`);
  },
  getCommentId: (id) => {
    return https.get(`/api/user/comment/${id}`);
  },
  deleteComment: (id) => {
    // console.log("check id delete",id)
    return https.delete(`/api/user/comment`, id);
  },
  editComment: (data) => {
    // console.log(id);
    // console.log("dataa",data);
    return https.put(`/api/user/comment/${data.roomId}`, data);
  },
};
