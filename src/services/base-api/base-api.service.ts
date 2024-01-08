import axios, { AxiosRequestConfig } from "axios";
import { getToken } from ".";

const instance = axios.create({
  // "http://localhost:3000/"
  baseURL: "https://opiniongate-production.up.railway.app/",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getToken("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getToken("refreshToken");
        const response = await axios.post("/api/refresh-token", {
          refreshToken,
        });
        const { accessToken } = response.data;

        localStorage.setItem("token", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

const apiService = {
  get: ({ url, data, headers }: AxiosRequestConfig<any>) => {
    const config = { params: {}, headers: {} };
    if (!url) {
      throw Error("endPoint is required param");
    } else {
      if (data) {
        config.params = data;
      }
      if (headers) {
        config.headers = headers;
      }

      return instance.get(url, config);
    }
  },
  post: ({ url, data, headers }: AxiosRequestConfig<any>) => {
    if (!url || !data) {
      throw Error("endPoint and data are required params");
    }

    return instance.post(url, data, { headers });
  },
  put: ({ url, data, headers }: AxiosRequestConfig<any>) => {
    if (!url || !data) {
      throw Error("endpoint and data are required params");
    }

    return instance.put(url, data, { headers });
  },
  delete: ({ url }: AxiosRequestConfig<any>) => {
    if (!url) {
      throw Error("endpoint is required param");
    }

    return instance.delete(url);
  },
};

export { apiService };
