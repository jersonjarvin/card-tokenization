import yamljs from 'yamljs';

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();

const yamlDocument = yamljs.load(`./env.yaml`);

const env = yamlDocument[process.env.NODE_ENV];

const AppConfig = {
  environment: process.env.NODE_ENV || 'development',
  is_development: (process.env.NODE_ENV || 'development') === 'development',
  is_production: (process.env.NODE_ENV || 'development') === 'production',

  app_port: env.HOST.PORT || '4000',
  base_path: env.HOST.BASE_PATH || '',
  base_path_swagger: env.HOST.BASE_PATH_SWAGGER || '/swagger',
  log_dir: env.HOST.LOG_DIR || 'logs'
};

const AppInfo = {
  app_version: yamlDocument.app_info.APP_VERSION || '1.0.0',
  app_name: yamlDocument.app_info.APP_NAME || 'ms-card-token',
  app_description: yamlDocument.app_info.APP_DESCRIPTION || '🚀 Microservice for card tokenization'
};

const DatabaseConfig = {
  redis_url: env.DATABASE.REDIS_URL
};

const Token = {
  jwt_secret_key: env.TOKEN.JWT_SECRET_KEY
};
export { AppInfo, AppConfig, DatabaseConfig, Token };
