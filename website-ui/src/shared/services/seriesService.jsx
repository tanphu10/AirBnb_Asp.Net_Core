import { https } from "./config";
export const seriesService = {
  getAllSeries: () => {
    return https.get("/api/admin/series");
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
