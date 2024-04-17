import axios from "axios";
import { getToken } from "../shared/function/token-storage";
const BASE_URL = "https://localhost:7217";

const tokenAdmin = getToken();

const configHeaderAxios = () => {
  return {
    token: tokenAdmin,
    Authorization: "Bearer " + tokenAdmin,
  };
};
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
