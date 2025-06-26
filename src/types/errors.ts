export type APIError = {
  success: boolean;
  code: number;
  error: string;
  message: string;
  errors?: FieldErrors[]
};

type FieldErrors = {
  field: string;
  message: string;
  code: string;
};
