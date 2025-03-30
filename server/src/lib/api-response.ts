// src/utils/api-response.ts

import { ApiResponse, Pagination } from "../types/api-response";

export function createResponse<T>(
  data: T,
  message: string = "Success",
  pagination?: Pagination
): ApiResponse<T> {
  return {
    status: "success",
    message,
    data,
    pagination,
  };
}
