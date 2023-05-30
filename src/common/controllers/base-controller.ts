import { ResponseCodes } from '@common/constants';
import { ErrorResponse, IParamError } from '@common/model';
import Koa from 'koa';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  ok(res: Koa.Response, data?: string | object | any) {
    res.status = StatusCodes.OK;
    res.body = data;
    return res;
  }
  created(res: Koa.Response, message?: string) {
    res.status = StatusCodes.CREATED;
    res.body = message;
    return res;
  }
  forbidden(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.FORBIDDEN, message);
  }
  badRequest(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.BAD_REQUEST, message);
  }
  notFound(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.NOT_FOUND, message);
  }
  conflict(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.CONFLICT, message);
  }
  internalError(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
  unauthorized(res: Koa.Response, message?: string) {
    return this.errorReponse(res, StatusCodes.UNAUTHORIZED, message);
  }
  invalidParamError(res: Koa.Response, errors: IParamError[]) {
    res.status = (StatusCodes.UNPROCESSABLE_ENTITY)
    res.body = new ErrorResponse({
        code: ResponseCodes.MODEL_IS_NOT_VALID,
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        errors: errors
      });
      return res;
  }
  result(res: Koa.Response, status: StatusCodes, data?: string | object | any) {
    res.status = status;
    res.body = data;
    return res;
  }
  private errorReponse(res:Koa.Response, status: StatusCodes, message?: string) {
    const req = res.request;
    const fullPath = `${req.method} ${req.protocol}://${req.headers.host}${req.originalUrl}`;
    const errorResponse = new ErrorResponse({
      code: ResponseCodes.FAILURE,
      status: status,
      message: message || getReasonPhrase(<number>status),
      path: fullPath
    });
    res.status = status;
    res.body = errorResponse;
    return res;
  }
}
