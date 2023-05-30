import { AppConfig } from '@common/config';
import { logger } from '@common/utils';
import Koa from 'koa';
import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = {
  write: (message: string | string[]) => logger.http(message.slice(0, Math.max(0, message.lastIndexOf('\n'))))
};

/**
 * Enable Morgan only in development mode.
 **/

const skip = () => !AppConfig.is_development;

export const morganMiddleware = () => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream,
      skip
    })(ctx.req, ctx.res, next);
  };
};
