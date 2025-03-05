import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { endpoints } from "./apiEndpoints";
import {
  AuthResponse, ImportIdResponse, OrdersResponse,
} from "./api.in";
import { BrowserContext } from "playwright";

export class API {

  async sendRequest(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: Record<string, any>,
    token?: string,
    cookies?: string,
    timeout = 60000,
  ): Promise<any> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (cookies) {
      headers["Cookie"] = cookies;
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
      timeout,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      await this.handleError(error);
      throw error;
    }
  }

  async handleError(error: unknown): Promise<void> {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("Response error data:", axiosError.response.data);
      console.error("Status:", axiosError.response.status);
      console.error("Headers:", axiosError.response.headers);
    } else if (axiosError.request) {
      console.error("Request made but no response:", axiosError.request);
    } else {
      console.error("Error during setup:", axiosError.message);
    }
  }

  async getAuthToken(username: string, password: string): Promise<string> {
    const data = {
      usernameOrEmailAddress: username,
      password: password,
    };
    const responseData = (await this.sendRequest(
      `${endpoints.baseURI}${endpoints.authEndpoint}`,
      "POST",
      data,
      undefined,
      undefined,
    )) as AuthResponse;
    return responseData.result.accessToken;
  }

  async getCookie(context: BrowserContext): Promise<string> {
    const allCookies = await context.cookies();
    const cookieName = allCookies[1]["name"];
    const cookieValue = allCookies[1]["value"];
    return `${cookieName}=${cookieValue}`;
  }

  async getImportId(cookies: string): Promise<string> {
    const url = endpoints.importIds;
    const data = {
      pagination: {
        page: 1,
        pages: 1,
        perpage: 100,
        total: 900,
      },
      query: {
        generalSearch: "imported date",
        search: true,
      },
    };
    const orders = (await this.sendRequest(
      url,
      "POST",
      data,
      undefined,
      cookies,
    )) as ImportIdResponse;

    return orders.data[0].id;
  }

  async getAllRecordIds(pageIndex: number, importId: string, cookies: string): Promise<string[]> {
    const url = endpoints.recordTableEndpoint;
    const data = {
      importId: `${importId}`,
      pagination: {
        page: pageIndex,
        pages: pageIndex,
        perpage: 100,
        total: 100,
      },
      query: null,
    };

    const orders = (await this.sendRequest(
      url,
      "POST",
      data,
      undefined,
      cookies,
      120000,
    )) as OrdersResponse;
    const orderIds: string[] = [];

    for (const order of orders.data) {
      orderIds.push(`${order.id}`);
    }
    return orderIds;
  }

  async deleteRecord(value: string, cookies: string): Promise<any> {
    const url = `${endpoints.deleteRecordEndpoint}${value}`;
    return await this.sendRequest(url, "DELETE", undefined, undefined, cookies, 180000);
  }

  async deleteAllTodayRecords(cookie: string): Promise<void> {
    for (let i = 1; i < 6; i++) {
      const importId = await this.getImportId(cookie);
      const allRecordIds = await this.getAllRecordIds(1, importId, cookie);
      for (const orderId of allRecordIds) {
        await this.deleteRecord(orderId, cookie);
      }
    }
  }
}
