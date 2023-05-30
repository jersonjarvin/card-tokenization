export type IParamError = {
  field: string;
  message: string;
};

export type IErrorResponse = {
  code?: string;
  status: number;
  message: string;
  path?: string;
  timestamp?: string;
  errors?: IParamError[];
};

export class ErrorResponse {
  code?: string;
  status: number;
  message: string;
  path?: string;
  timestamp?: string;
  errors?: IParamError[];

  constructor(params: IErrorResponse) {
    this.code = params.code;
    this.status = params.status;
    this.message = params.message;
    this.path = params.path;
    this.timestamp = params.timestamp ? params.timestamp : new Date().toISOString();
    this.errors = params.errors;
  }
}
