import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';
import { store } from '../redux/store';
import { removeUser } from '@/redux/reducers/user';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '@/redux/reducers/settingSlice';
import { setBooks } from '@/redux/reducers/bookSlice';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  useAuthHeaders?: boolean;
  userInfo?: {
    key: string;
    secret: string;
  };
}

export function generateMD5Sign(
  method: string,
  urlPath: string,
  body: Record<string, any> | string | null,
  userSecret: string
): string {
  const requestBody = body ? JSON.stringify(body) : '';
  const stringToHash = `${method}${urlPath}${requestBody}${userSecret}`;
  return CryptoJS.MD5(stringToHash).toString();
}

export const apiClient = axios.create({
  baseURL: 'https://no23.lavina.tech',
});

apiClient.interceptors.request.use(
  config => {
    const customConfig = config as CustomAxiosRequestConfig;

    if (customConfig.useAuthHeaders) {
      const method = config.method?.toUpperCase() || 'GET';
      const url = config.url || '';
      const data = config.data || null;

      const urlPath = url.replace(config.baseURL || '', '');
      const userSecret =
        customConfig?.userInfo?.secret ||
        store.getState()?.user.userInfo.secret;
      const userKey =
        customConfig?.userInfo?.key || store.getState()?.user.userInfo.key;
      const sign = generateMD5Sign(method, urlPath, data, userSecret);

      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set('Key', userKey);
      config.headers.set('Sign', sign);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const logOut = (): void => {
  store.dispatch(removeUser());
};

export const getAllBooks = async (title?: string): Promise<void> => {
  const url = title ? `/books/${title}` : `/books`;
  store.dispatch(setLoading({ key: 'getAllBooks', status: true }));
  try {
    const response = await apiClient.get(url, {
      useAuthHeaders: true,
    } as CustomAxiosRequestConfig);
    if (title) {
      let formedBooks = response.data.data?.map(bk => {
        return { book: bk, status: 0 };
      });
      store.dispatch(setBooks(formedBooks));
    } else {
      store.dispatch(setBooks(response.data.data));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    store.dispatch(setLoading({ key: 'getAllBooks', status: false }));
    store.dispatch(setLoading({ key: 'searchBook', status: false }));
  }
};
