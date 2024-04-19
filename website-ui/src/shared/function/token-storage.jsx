const TOKEN_KEY = "auth-token";
const REFRESHTOKEN_KEY = "auth-refreshtoken";
const USER_KEY = "auth-user";

export const saveToken = (token) => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.setItem(TOKEN_KEY, token);
  const user = getUser();
  // console.log("user", user);
  if (user?.id) {
    var a = { ...user, accessToken: token };
    saveUser(a);
  }
};
export const signOut = () => {
  window.localStorage.clear();
};
export const saveUser = (user) => {
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const saveRefreshToken = (token) => {
  window.localStorage.removeItem(REFRESHTOKEN_KEY);
  window.localStorage.setItem(REFRESHTOKEN_KEY, token);
};
export const getUser = () => {
  const token = window.localStorage.getItem(USER_KEY);
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const user = JSON.parse(b64DecodeUnicode(base64));
  return user;
};
export const b64DecodeUnicode = (str) => {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};
export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};
