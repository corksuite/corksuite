export type ApiResponse<TData> = {
  data: TData;
  meta?: Record<string, unknown>;
};

export type ApiError = {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
};
