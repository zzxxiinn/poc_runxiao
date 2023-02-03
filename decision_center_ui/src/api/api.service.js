import { createAuthInstance } from "./general";

console.log(import.meta.env);
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const i = () => createAuthInstance(baseUrl);

const login = async (options) => i().post("api/token", options);

const uploadExcel = async (formdata) => i().post("api/excel", formdata);

export const apiService = {
  login,
  uploadExcel,
};
