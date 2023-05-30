import { injectable } from 'inversify';
import { Ctx, Middleware } from 'routing-controllers';
import { Context } from 'vm';
import { HEADER } from '../common/constants';
import { AppConfig } from '../common/config';
import { StatusCodes } from 'http-status-codes';

@Middleware({ type: 'before' })
@injectable()
export class ValidateHeadersMiddleware {
  public async use(@Ctx() context: Context, next: (err?: any) => Promise<any>): Promise<any> {
    const errorsHeaders: any = [];
    const healthy = `${AppConfig.base_path}/health`;

    if (context.URL.pathname !== healthy && context.method !== 'OPTIONS' && context.URL.pathname != AppConfig.base_path_swagger) {
      if (context.request.header[HEADER.KEY] === undefined) {
        errorsHeaders.push({
          param: HEADER.KEY,
          value: `header ${HEADER.KEY} no sent`
        });
      }
    }

    if (errorsHeaders.length > 0) {
      context.status = StatusCodes.BAD_REQUEST;
      context.body = errorsHeaders;
      return;
    }

    return next();
  }
}
