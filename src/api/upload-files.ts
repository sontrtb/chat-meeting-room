import { store } from "@/redux/store";
import axios, { AxiosResponse } from "axios";


const uploadFiles = (file: File): Promise<AxiosResponse<string>> => {
  const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/uploadCloudflare`,
    method: "post",
    timeout: 30000,
    withCredentials: true,
  });

  const state = store.getState();
  apiClient.defaults.headers.common.Authorization = `Bearer ${state.user.user?.token}`;

  const formData = new FormData();
  formData.append("file", file);
  return apiClient({
    data: formData,
  });
};

export { uploadFiles };
