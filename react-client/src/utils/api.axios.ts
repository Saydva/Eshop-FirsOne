import axios from "axios";

export const useAxios = (route: string) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/" + route,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const setAuthToken = (token: string) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };
  return { api, setAuthToken };
};
