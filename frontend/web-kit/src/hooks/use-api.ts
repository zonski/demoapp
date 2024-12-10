import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiRequestConfig extends AxiosRequestConfig {
  noAuth?: boolean;
}

export interface Api {
  get<T>(url: string, config?: ApiRequestConfig): Promise<T>;

  post<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T>;

  put<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T>;

  patch<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T>;

  delete<T>(url: string, config?: ApiRequestConfig): Promise<T>;
}

interface ApiConfig {
  baseUrl: string;
  auth: {
    domain: string;
    clientId: string;
  };
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status;
    this.code = code;
  }
}

export const useApi = (config: ApiConfig): Api => {

  const { getAccessTokenSilently } = useAuth0();
  const axiosClient = axios.create({ baseURL: `${config.baseUrl}` });

  axiosClient.interceptors.request.use(async (config) => {
    if ((config as ApiRequestConfig).noAuth) {
      return config;
    }
    config.headers["Content-Type"] = "application/json";
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = error.response.data;
        let message = error.message;
        if (typeof data === 'string') {
          message = data;
        } else if (data.message) {
          message = data.message;
        }
        throw new ApiError(error.response.status, error.code, message)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new ApiError(-1, error.code, error.message)
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new ApiError(-2, error.code, error.message)
      }
    },
  );

  return {
    async get<T>(url: string, config?: ApiRequestConfig): Promise<T> {
      return toResult<T>(axiosClient.get<T>(url, config));
    },
    async post<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
      return toResult<T>(axiosClient.post<T>(url, data, config));
    },
    async put<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
      return toResult<T>(axiosClient.put<T>(url, data, config));
    },
    async patch<T>(url: string, data?: unknown, config?: ApiRequestConfig): Promise<T> {
      return toResult<T>(axiosClient.patch<T>(url, data, config));
    },
    async delete<T>(url: string, config?: ApiRequestConfig): Promise<T> {
      return toResult<T>(axiosClient.delete<T>(url, config));
    },
  };
};

const toResult = async <T>(resp: Promise<AxiosResponse<T>>): Promise<T> => {
  const { data } = await resp;
  return data;
};
