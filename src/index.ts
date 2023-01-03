import dotenv from 'dotenv';
import container from './startup/container';
import initDB from './config/database';
import logger from './middleware/logger';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const server = container.resolve('server');

server
  .start(__dirname)
  .then(async () => {
    initDB();
  })
  .catch((err: any) => {
    console.log(err);
    logger.error(err);
    process.exit();
  });
