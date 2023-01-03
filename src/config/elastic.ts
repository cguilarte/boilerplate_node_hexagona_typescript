import elasticSearch from 'elasticsearch';
import { env } from './env';

const elasticClient = new elasticSearch.Client({
  host: `${env.ELASTIC_HOST}:${env.ELASTIC_PORT}`,
});

export default elasticClient;
