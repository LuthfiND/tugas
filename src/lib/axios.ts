import axios from "axios";
import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value ?? "";
};
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
instance.interceptors.request.use(async function (config) {
  const accessToken = await getCookie("accessToken");
  config.headers.Authorization = `bearer ${accessToken}`;
  return config;
});

export default instance;
