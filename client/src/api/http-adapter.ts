import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  IHttpClient,
  MethodsEnum,
  MethodType,
  RequesterFn,
} from "./types/api-type";

export function AxiosAdapter(
  instance: AxiosInstance,
  opts?: AxiosRequestConfig
): RequesterFn {
  return async function requester<T>(
    url: string,
    method: MethodType,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      headers,
      ...opts,
    };
    const response: AxiosResponse<T> = await instance.request(config);
    return response?.data;
  };
}

export class HttpClient implements IHttpClient {
  public requester: RequesterFn;
  constructor(requester: RequesterFn) {
    this.requester = requester;
  }
  async GET<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.requester<T>(url, MethodsEnum.GET, undefined, headers);
  }
  async POST<T, B = unknown>(
    url: string,
    body?: B,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.requester<T>(url, MethodsEnum.POST, body, headers);
  }
  async PUT<T, B = unknown>(
    url: string,
    body?: B,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.requester<T>(url, MethodsEnum.PUT, body, headers);
  }
  async DELETE<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.requester<T>(url, MethodsEnum.DELETE, undefined, headers);
  }
  async PATCH<T, B = unknown>(
    url: string,
    body?: B,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.requester<T>(url, MethodsEnum.PATCH, body, headers);
  }
}
