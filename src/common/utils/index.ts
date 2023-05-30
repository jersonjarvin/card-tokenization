import { AppConfig } from '@common/config';
import { WinstonLogger } from './winston-logger';
const logger = new WinstonLogger(false, AppConfig.is_development, AppConfig.log_dir);
export { logger };
export { RedisDB } from './redis-db';
