import figlet from 'figlet';
import dedent from 'ts-dedent';
import cors from '@koa/cors';
//import Koa from 'koa';
import Router from 'koa-router';
import { AppInfo, AppConfig } from '@common/config';
import { logger } from '@common/utils';
import { createKoaServer, useContainer } from 'routing-controllers';
import bodyParser from 'koa-bodyparser';
import yamljs from 'yamljs';
import { AppContainer } from '@common/config/container';
import { morganMiddleware } from '@/middlewares';
import { koaSwagger } from 'koa2-swagger-ui';

const router = new Router();

const swaggerDocument = yamljs.load('./swagger.yaml');

const app = createKoaServer({
  routePrefix: AppConfig.base_path,
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
  middlewares: [`${__dirname}/middlewares/**/*{.js,.ts}`],
  defaultErrorHandler: false
});

const container = new AppContainer().container;
useContainer(container);

app.use(
  cors({
    origin: '*',
    credentials: false,
    allowMethods: ['GET, POST'],
    allowHeaders: '*'
  })
);

router.get('/', (ctx) => {
  ctx.redirect('swagger');
});

app.use(bodyParser());
app.use(morganMiddleware());

app.use(
  koaSwagger({
    routePrefix: AppConfig.base_path_swagger,
    swaggerOptions: { spec: swaggerDocument }
  })
);

app.use(router.routes());

const showBanner = (): void => {
  const banner = dedent`Application started successfully!
         ${figlet.textSync(AppInfo.app_name)}
          Name: ${AppInfo.app_name}
          Description: ${AppInfo.app_description}
          Version: ${AppInfo.app_version}
          Port: ${AppConfig.app_port}
          Base Path: ${AppConfig.base_path}
          Environment: ${AppConfig.environment}
          Copyright © ${new Date().getFullYear()}. All rights reserved.
       `;
  logger.info(banner);
};

export { app, showBanner };
