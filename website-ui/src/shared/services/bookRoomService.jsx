import { https } from "./config";
export const bookRoomService = {
  getAllBookRoom: () => {
    return https.get("/api/bookroom");
  },
  postControlBook: (data) => {
    return https.post("/api/admin/book-room", data);
  },
  deleteRoom: (id) => {
    return https.delete(`/api/bookroom/${id}`);
  },
  roomUserBooked: (id) => {
    return https.get(`/api/admin/book-room/room-booked-user/${id}`);
  },
  GetBookId: (id) => {
    return https.get(`/api/admin/book-room/${id}`);
  },
  PayRoomBooked: (pay) => {
    return https.post(`/api/admin/pay-room/${pay.ownerId}/${pay.bookId}`);
  },
};
