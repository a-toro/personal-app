// src/interfaces/api-response.ts

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  pagination?: Pagination;
}
