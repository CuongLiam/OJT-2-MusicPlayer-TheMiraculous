export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}
