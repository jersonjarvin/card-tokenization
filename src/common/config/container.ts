
import { Container } from 'inversify';
import * as Controllers from '@/controllers';
import * as Middlewares from '@/middlewares';
import * as IRepositories from '@/domain/interfaces/repository';
import * as IServices from '@/domain/interfaces/service';
import * as Services from '@/services';
import * as Repositories from '@/repositories';


import { RedisDB, logger } from '@common/utils';
import { BaseController } from '@common/controllers';
import { KoaMiddlewareInterface } from 'routing-controllers';
import { TYPES } from '@common/constants';

export class AppContainer {
    container = new Container
    constructor() {
        this.configure();
    }
    configure() {
        try {
            this.configureControllers();
            this.configureServices();
            this.configureRepository();
            this.configureOthers();
        } catch (error) {
            logger.error(error);
            process.exit(1);
        }
    }
    configureControllers() {
        (<any>Object).values(Controllers).map((ctrl: any) => {
          this.container.bind<BaseController>(ctrl).toSelf().inSingletonScope();
        });
      }
      configureServices() {
        this.container.bind<IServices.ICardService>(TYPES.CardService).to(Services.CardService);
      }
      configureRepository() {
        this.container.bind<IRepositories.ICardRepository>(TYPES.CardRepository).to(Repositories.CardRepository);
      }
      configureOthers(){
        this.container.bind<KoaMiddlewareInterface>(Middlewares.ErrorHandlerMiddleware).toSelf().inSingletonScope();
        this.container.bind<KoaMiddlewareInterface>(Middlewares.ValidateHeadersMiddleware).toSelf().inSingletonScope();
        this.container.bind<RedisDB>(TYPES.RedisDB).to(RedisDB).inRequestScope();
      }
}