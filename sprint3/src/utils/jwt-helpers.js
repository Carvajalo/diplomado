import axios from "axios";
import { IJwt } from "../contexts/Users/loginRoutes";

export function setToken({ token }) {
  localStorage.setItem("token", JSON.stringify(token));
  axios.defaults.headers["x-access-token"] = token.token;
}

export function removeToken() {
  localStorage.removeItem("token");
  axios.defaults.headers["x-access-token"] = "";
}

export function getToken() {
  const token = localStorage.getItem("token");
  return JSON.parse(token);
}
