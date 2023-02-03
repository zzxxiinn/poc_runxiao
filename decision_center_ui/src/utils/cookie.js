import Cookies from "js-cookie";

const accessToken = "auth_key";

const getToken = () => {
  return Cookies.get(accessToken);
};

const setToken = (token) => {
  Cookies.set(accessToken, token);
};

const removeToken = () => {
  Cookies.remove(accessToken);
};

export { getToken, setToken, removeToken };
