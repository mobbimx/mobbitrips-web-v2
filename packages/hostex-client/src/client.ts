import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

interface RetryConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

function createHostexClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.HOSTEX_BASE_URL ?? 'https://api.hostex.io/v3',
    timeout: 10_000,
    headers: {
      Authorization: `Bearer ${(process.env.HOSTEX_API_TOKEN ?? '').trim()}`,
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(undefined, async (error) => {
    const config = error.config as RetryConfig | undefined;
    if (!config) return Promise.reject(error);
    config.__retryCount = config.__retryCount ?? 0;
    const isServerError = error.response?.status >= 500;
    if (isServerError && config.__retryCount < 3) {
      config.__retryCount += 1;
      await new Promise((r) => setTimeout(r, config.__retryCount! * 1_000));
      return instance(config);
    }
    return Promise.reject(error);
  });

  return instance;
}

export const hostexClient = createHostexClient();

export function hasToken(): boolean {
  return Boolean(process.env.HOSTEX_API_TOKEN);
}
