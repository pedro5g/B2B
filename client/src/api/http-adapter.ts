import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  IHttpClient,
  MethodsEnum,
  MethodType,
  RequesterFn,
} from "./types/api-type";

export class AxiosAdapter {
  private constructor(
    private instance: AxiosInstance,
    private opts?: AxiosRequestConfig
  ) {}
  private async request<T>(
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
      ...this.opts,
    };
    const response: AxiosResponse<T> = await this.instance.request(config);
    return response?.data;
  }

  static create(instance: AxiosInstance, opts?: AxiosRequestConfig) {
    return new AxiosAdapter(instance, opts).request;
  }
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
