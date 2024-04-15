import axios from "axios";
import { layDuLieuLocal } from "../util/localStorage";

// const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
// 'https://localhost:7217/api/admin/room/all-room' 
const BASE_URL = "https://localhost:7217";

const tokenAdmin = layDuLieuLocal("user");

const configHeaderAxios = () => {
  return {
    token: tokenAdmin?.token,
    Authorization: "Bearer " + tokenAdmin?.token,
  };
};
// console.log(configHeaderAxios());
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
