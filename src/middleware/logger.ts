import path from 'path';
import winston from 'winston';
import { env } from '../config/env';

const pathLog = path.join(__dirname, '..', '..', 'logs/');

/* Transportes disponibles: https://github.com/winstonjs/winston/blob/master/docs/transports.md
  Niveles de Logs:
  error: 0
  warn: 1
  info: 2
  verbose: 3
  debug: 4
  silly: 5 */

  export = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: env.LOGGER ? 'error' : 'debug',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.File({
        level: 'info',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.simple(),
          // eslint-disable-next-line arrow-body-style
          winston.format.printf(({ level, message, timestamp }) => {
            return `[${level
              .replace('[39m', '')
              .replace('[32m', '')
              .replace('[31m', '')
              .trim()}]: ${timestamp}  - ${message}`;
          }),
        ),
        maxsize: 5120000, // 5 Mb
        maxFiles: 5,
        filename: `${pathLog}${env.APPLICATION_NAME}.log`,
      }),
    ],
  });
