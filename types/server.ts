export interface ServerActionSuccessResult<TData> {
  status: "success";
  data?: TData;
}

export interface ServerActionErrorBaseResult {
  status: "error";
}

export interface ServerActionErrorValidationResult
  extends ServerActionErrorBaseResult {
  type: "validation";
  errors: Array<{ field: string; message: string }>;
}

export interface ServerActionErrorAuthResult
  extends ServerActionErrorBaseResult {
  type: "auth";
  message: string;
}

export type ServerActionErrorResult =
  | ServerActionErrorValidationResult
  | ServerActionErrorAuthResult;

export type ServerActionResult<TData = unknown> =
  | ServerActionSuccessResult<TData>
  | ServerActionErrorResult;
