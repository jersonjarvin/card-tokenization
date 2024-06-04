# Microservicio Tokenización de Tarjetas

Proyecto de tokenización de tarjetas, desarrollado con NodeJs, KoaJs, Inversify y Redis.

## Instalación

Para clonar este repositorio en su dispositivo:

```bash
git clone https://github.com/jersonjarvin/card-tokenization.git
```
Una vez que lo haya clonado con éxito, vaya directamente a la carpeta del directorio e instale las dependencias:

```bash
npm install
```
Para poder ejecturar la aplicación en modo local, es necesario tener instalado Redis, para ello vamos a ejecutar el siguiente script que instalará Redis y desplegará la aplicación en Docker.

En caso tener instalado Redis, solo se debe cambiar los datos de conexión en el archivo env.yaml:

`REDIS_URL: 'redis://localhost:6379'`

```bash
npm run deploy-docker:build
```
## Comandos

Ejecutar localmente:

```bash
npm run dev
```

Ejecutar en produccion:

```bash
npm run prod ó npm run start
```
Generar Build:

```bash
npm run build
```
📌 Pruebas:

```bash
# ejecutar todas las pruebas
npm run test

# ejecutar todas las pruebas en modo watch
npm run test:watch

# ejecutar covertura de pruebas
npm run coverage
```

📌  Docker:

```bash
# ejecutar docker container
npm run deploy-docker:build

# redesplegar docker container
npm run deploy-docker:rebuild

# ejecutar contenedor detenido
npm run deploy-docker:start

# detener contenedor 
npm run deploy-docker:stop
```

📌 Linting:

```bash
# ejecutar ESLint
npm run check:lint

# corregir ESLint errors
npm run fix:lint

# run prettier
npm run check:format

# corregir prettier errors
npm run fix:format
```

## Variables de entorno


Las variables de entorno se pueden encontrar y modificar en el archivo `.env.yaml`. Vienen con estos valores predeterminados:


```bash
development:
  HOST:
    BASE_PATH: 
    BASE_PATH_SWAGGER: '/swagger'
    CORS_URL: '*'
    PORT: 4700
  DATABASE:
    REDIS_URL: 'redis://localhost:6379'
    # Log
    # Example '/home/node/logs'
    # DEFAUlT is this project's directory
    # LOG_DIR=YOUR_DIRECTORY_PATH_FOR_LOG_FILES
  TOKEN:
    JWT_SECRET_KEY: 'WnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/'
production:
  HOST:
    BASE_PATH:
    BASE_PATH_SWAGGER: '/swagger'
    CORS_URL: '*'
    PORT: 4700
  DATABASE:
    REDIS_URL: 'redis://redis-db:6379'
  TOKEN:
    JWT_SECRET_KEY: 'WnZr4u7x!A%D*G-1cuwe6wBsD3dss/'
    # Log
    # Example '/home/node/logs'
    # DEFAUlT is this project's directory
    # LOG_DIR=YOUR_DIRECTORY_PATH_FOR_LOG_FILES
# App Information
app_info:
  APP_NAME: 'ms-card-token'
  APP_DESCRIPTION: '🚀 Microservice for card tokenization'
  APP_VERSION: 1.0

```

## Estructura del proyecto

```
src\
 |--common              # Código reutilizable y disponible para todo nuestro proyecto.
 |--common\config\      # Variables de entorno y cosas relacionadas con la configuración.
 |--common\constants\   # Constantes reutilizables.
 |--common\controllers\ # Base Controller.
 |--common\model\       # Modelos reutilizables.
 |--common\utils\       # Clases de utilidad y funciones.
 |--controllers\        # Route controllers.
 |--middlewares\        # Middlewares personalizados.
 |--domain\dtos\        # Data transfer objects
 |--domain\dtos\validatiors    # Request data validation 
 |--domain\entities\    # Redis models
 |--domain\interfaces\  # Interfaces Repository / Services
 |--services\           # Lógica de negocio 
 |--repositories\       # Acceso a datos
 |--app.js              # Koa app
 |--server.js           # App entry point
```

## API Documentación

Para ver la lista de API disponibles y sus especificaciones, ejecute el servidor y vaya a  `http://localhost:4700/swagger` en su navegador. Esta página de documentación es generada a partir del archivo `swagger.yaml`.

### API Endpoints

Lista de rutas disponibles:

**Card routes**:\
`POST /v1/tokens` - registrar\
 - Header \
    `POST x-commerce-key -> Indentificador del comercio.`
    
`GET /v1/tokens/card-info` - información de tarjetas
 - Header \
    `POST x-commerce-key -> Indentificador del comercio. (cc7b5eed-e9ea-4288-908a-ec1a18ba17d5)`\
    `POST token -> token.`


## Error Handling

La aplicación tiene un mecanismo de manejo de errores centralizado.

El middleware de manejo de errores envía una respuesta de error, que tiene el siguiente formato:
:

```json
{
    "code": "10001",
    "status": 400,
    "message": "Bad Request",
    "path": "POST http://localhost:4700/v1/tokens",
    "timestamp": "2023-05-30T04:22:25.308Z",
    "errors": []
}
```

Cuando se ejecuta en modo de desarrollo, la respuesta de error también contiene la pila de errores (stack).



## Validation

Los datos de la solicitud se validan mediante [Class Validator](https://www.npmjs.com/package/class-validator).

## License

Developer by 💻😎 Jerson Romero
