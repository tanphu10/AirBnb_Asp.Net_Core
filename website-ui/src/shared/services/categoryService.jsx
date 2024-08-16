import { https } from "./config";
export const categoryService = {
  getAllCategory: () => {
    return https.get("/api/admin/category/all/item");
  },
  searchRoom: (data) => {
    console.log(data);
    if (data.keyword) {
      return https.get(
        `/api/admin/room/paging?keyword=${data.keyword}&pageIndex=${
          data.pageIndex ? data.pageIndex : 1
        }&pageSize=${data.pageSize ? data.pageSize : 10}`
      );
    } else {
      return https.get(
        `/api/admin/room/paging?pageIndex=${
          data.pageIndex ? data.pageIndex : 1
        }&pageSize=${data.pageSize ? data.pageSize : 10}`
      );
    }
  },
};
