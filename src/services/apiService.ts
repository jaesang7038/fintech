import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";

const executeRequest = async (
  method: Method,
  url: string,
  data?: any,
  params?: any,
  headers?: any,
  baseURL?: string,
): Promise<any> => {
  const apiBaseURL =
    baseURL ||
    process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8081/api";

  const apiInstance: AxiosInstance = axios.create({ baseURL: apiBaseURL });

  const config: AxiosRequestConfig = {
    method,
    url,
    ...(data && { data }),
    ...(params && { params }),
    ...(headers && { headers }),
  };

  try {
    const response = await apiInstance.request(config);
    return response.data;
  } catch (error) {
    console.error(
      `There was an error with the ${method} request to ${url}:`,
      error,
    );
    throw error;
  }
};

export const apiService = {
  get: (url: string, params?: any, headers?: any, baseURL?: string) =>
    executeRequest("GET", url, null, params, headers, baseURL),
  post: (
    url: string,
    data: any,
    params?: any,
    headers?: any,
    baseURL?: string,
  ) => executeRequest("POST", url, data, params, headers, baseURL),
  put: (
    url: string,
    data: any,
    params?: any,
    headers?: any,
    baseURL?: string,
  ) => executeRequest("PUT", url, data, params, headers, baseURL),
  delete: (url: string, params?: any, headers?: any, baseURL?: string) =>
    executeRequest("DELETE", url, null, params, headers, baseURL),
};