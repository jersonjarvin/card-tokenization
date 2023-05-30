import { ResponseCodes } from '@common/constants/response-codes';
import { logger } from '@common/utils';
import { ErrorResponse, IParamError } from '@common/model';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import {Ctx, KoaMiddlewareInterface, Middleware, HttpError} from 'routing-controllers';
import { injectable } from 'inversify';
import { Context } from 'koa';
import { ValidationError } from 'class-validator';

@Middleware({type: 'before'})
@injectable()
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  async use(@Ctx() context: Context, next: (err?: any) => Promise<any>): Promise<any> {
    return await next().catch((err) => {
    const req = context.request; 
    const fullPath = `${context.method} ${req.protocol}://${req.headers.host}${req.originalUrl}`;
    
    let logMessage = `${err.message}\n\tpath: ${fullPath}`;
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      logMessage += `\n\trequest body: ${JSON.stringify(req.body)}`;
    }
    logMessage += `\n\trequest params: ${JSON.stringify(req.querystring)}`;
    logMessage += `\n\trequest query: ${JSON.stringify(req.query)}`;
    logMessage += `\n\trequest headers: ${JSON.stringify(req.headers)}`;
    logMessage += `\n\tstacktrace: ${err.stack}`;

    if (Array.isArray(err.errors) && err.errors.every((element: any) => element instanceof ValidationError)) {
      const errors: Array<IParamError> = [];
      if (err.errors.length > 0) {
        err.errors.forEach((e: ValidationError) => {
          const constraints = Object.values(e.constraints || {});
          constraints.forEach((v) => {
            errors.push({ field: e.property, message: v });
          });
        });
      }
      const errorResponse = new ErrorResponse({
        code: ResponseCodes.FAILURE,
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        errors: errors,
        path: fullPath
      });
      context.status = errorResponse.status;
      context.body = errorResponse;

    }else if (this.isHttpException(err)) {
      const error = err;
      const errorResponse = new ErrorResponse({
        code: ResponseCodes.FAILURE,
        status: error.httpCode,
        message: error.message ||  getReasonPhrase(error.statusCode),
        path: fullPath
      });
      context.body = errorResponse;
      context.status = error.httpCode;
    } else {
      
      const errorResponse = new ErrorResponse({
        code: ResponseCodes.FAILURE,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        path: fullPath
      });
      context.body = errorResponse;
      context.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    logger.error(err);
    logger.error(logMessage);
    });
  }
  isHttpException = (error: object | any) => {
    if (error instanceof HttpError) {
      return true;
    } else {
      return false;
    }
  }  
}
