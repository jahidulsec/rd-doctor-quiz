export interface SuccessMulti<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total_page: number;
    total_items: number;
  };
}

export interface SuccessSingle<TData> {
  success: boolean;
  message: string;
  data: TData;
}
