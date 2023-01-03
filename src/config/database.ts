import mongoose from 'mongoose';
import logger from '../middleware/logger';
import { env } from './env';

export default () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(`${env.DB_URI}`)
    .then(() => {
      console.log('✅ Database connected');
    })
    .catch((error) => {
      logger.error(error);
      console.log('❌ Database not connected');
    });
};
