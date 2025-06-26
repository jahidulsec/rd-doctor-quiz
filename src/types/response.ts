import { APIError } from "./errors";
import { SuccessMulti, SuccessSingle } from "./success";

export interface MutiResponseType<T> {
  data: SuccessMulti<T> | null;
  error: APIError | null;
}

export interface SingleResponseType<T> {
  data: SuccessSingle<T> | null;
  error: APIError | null;
}
