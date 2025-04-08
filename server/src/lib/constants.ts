import { EnvConfig } from "./env";

export const JWT_SCHEMA = "Bearer";

export enum CookiesNames {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
}

export const PRODUCTION_ENV = "production";
export const DEV_ENV = "development";
export const QA_ENV = "qa";

export type RoutesNamesType = typeof RoutesNames;

export const BASE_API = EnvConfig.apiRoot;

export const AUTH_PATH_BASE = `${BASE_API}/auth`;

export const RoutesNames = {
  auth: {
    root: AUTH_PATH_BASE,
    login: `/login`,
    register: `/register`,
    refresh: `/refresh`,
    logout: `/logout`,
    session: `/session`,
  },
  user: {
    root: `${BASE_API}/users`,
    users: "",
  },
  expenseCategory: {
    root: `${BASE_API}/expense-category`,
    categories: "",
  },
  expense: {
    root: `${BASE_API}/expenses`,
    expenses: "",
  },
};
