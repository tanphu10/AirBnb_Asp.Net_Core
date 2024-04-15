import { https } from "./config";
export const commentService = {
  postComment: (data) => {
    return https.post("/api/comment", data);
  },
  getAllComment: () => {
    return https.get("/api/user/comment/all");
  },
  getCommentRoom: (id) => {
    return https.get(`/api/user/comment/room/${id}`);
  },
  deleteComment: (id) => {
    return https.delete(`/api/user/comment/${id}`);
  },
  editComment: (id, data) => {
    return https.put(`/api/user/comment/${id}`, data);
  },
};
