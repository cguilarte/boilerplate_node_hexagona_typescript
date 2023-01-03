export const env = {
  // ENV HTTP
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  PORT: process.env.PORT,
  HOST_SERVER: `${process.env.HOST}:${process.env.PORT}`,
  URL_FRONTEND: process.env.URL_FRONTEND,
  IMAGEN_CDN: process.env.IMAGEN_CDN,

  // ENV CACHE
  CACHE_KEY: process.env.CACHE_KEY,
  ONE_TIME: process.env.ONE_TIME,

  // ENV TOKEN
  JWTKey: process.env.JWT_key,
  JWTIssuer: process.env.JWT_issuer,
  JWTSubject: process.env.JWT_subject,
  JWTAudience: process.env.JWT_audience,
  JWTExpiresIn: process.env.JWT_expiresIn,
  JWTAlgorithms: process.env.JWT_algorithms,

  // ENV DATABASE
  DB_URI: process.env.DB_URI,

  // ENV MAIL
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,

  // ENV ELASTISEARCH
  ELASTIC_HOST: process.env.ELASTIC_HOST,
  ELASTIC_PORT: process.env.ELASTIC_PORT,
  ELASTIC_PINGTIMEOUT: process.env.ELASTIC_PINGTIMEOUT,

  // Logger
  LOGGER: process.env.LOGGER,
};

console.log(`✅ Init enviroment -> [${process.env.NODE_ENV}]`);
