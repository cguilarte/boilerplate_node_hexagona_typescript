import { createContainer, asValue, asClass } from 'awilix';
import path from 'path';
import { env } from '../config/env';
import server from '.';
import logger from '../middleware/logger';
// import uploadFile from '../middleware/uploadFile';
import mail from '../config/mail';
import elasticClient from '../config/elastic';

const container = createContainer();

// Dir
const pathModels = path.join(__dirname, '..', 'Models');
const pathApp = path.join(__dirname, '..', 'app');

// Init Container
container
// middleware
  .register({
    logger: asValue(logger),
    mail: asValue(mail),
  })
// Configurations
  .register({
    server: asClass(server).singleton(),
    config: asValue(env),
  })

// Registro de elastisearch (Motor de text)
  .register({
    elasticClient: asValue(elasticClient),
  });

// Registro de los modelos
container.loadModules([`${pathModels}/*.*`], {
  resolverOptions: {
    register: asValue,
  },
});

// Reguistra las tipo asClass/asFunction
container.loadModules(
  [`${pathApp}/**/*Service.*`, `${pathApp}/**/*Repository.*`],
  {
    resolverOptions: {
      register: asClass,
    },
  },
);

export default container;
