import Axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';


const createHttpConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
  };
};

export const httpConfig = (): AxiosRequestConfig => {

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  return config;
};

export const getUrl = (url: string, base: 'url1' | 'url2' = 'url1') => {
  const baseUrl = process.env.REACT_APP_API_URL;
  return `${baseUrl}${url}`;
};


function get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
  return new Promise((res, rej) => {
    Axios.get<T>(url, createHttpConfig(config))
      .then(data => {
        res(data);
      })
      .catch(err => {
        rej(err);
      });
  });
}


export const http = {
  get: <T>(url: string, accessToken?: string, config?: AxiosRequestConfig) => get<T>(getUrl(url), config),
};

