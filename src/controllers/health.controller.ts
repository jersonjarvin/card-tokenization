import { Controller, Get, Res, Req } from "routing-controllers";
import { BaseController } from '@common/controllers';
import { HealthStatus } from '@common/model/health-status';
import Koa from 'koa';
import { injectable } from "inversify";
@Controller('/health')
@injectable()
export class HealthController extends BaseController {
  constructor() {
    super();
  }
  @Get()
  public async get(@Req() _req: Koa.Request, @Res() res: Koa.Response,) {
   return this.ok(res, new HealthStatus('ALIVE', `healthy 😎 !`));
  }
}
