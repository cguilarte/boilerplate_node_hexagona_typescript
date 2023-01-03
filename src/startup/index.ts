import path from 'path';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { graphqlUploadExpress } from 'graphql-upload-ts';
import checkAuthGraphql from '../middleware/checkAuthGraphql';
import logger from '../middleware/logger';

// CrontTab
import configCron from '../jobs/config';
import sheduler from '../jobs';

// Schema para Graphql
import schema from '../config/graphql/schema';
// GraphQL Modulos
const { ApolloServer } = require('apollo-server-express');
// Directives Graphql
/* import { schemaDirectives } from '../graphql/directives';
 */

class Server {
  public app;

  public config;

  public userService = null;

  constructor({
    config,
    userService,
  }: any) {
    this.app = express();
    this.config = config;
    this.userService = userService;
  }

  start(_dir: any) {
    return new Promise(async (resolve: any) => {
      // Inicialización de Server y middleware de Graphql
      const httpServer = createServer(this.app);

      const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        onConnect: () => {
          console.log('Connect websocket');
        },
      }, {
        server: httpServer,
        path: '/graphql',
      });

      const serverAPolo = new ApolloServer({
        schema,
        csrfPrevención: true,
        bodyParserConfig: {
          limit: '50mb',
        },
        plugins: [
          // Apollo Tootl Local
          /* process.env.NODE_ENV === 'production'
                      ? ApolloServerPluginLandingPageDisabled()
                      : ApolloServerPluginLandingPageGraphQLPlayground(), */
          // Cierre adecuado para el servidor HTTP.
          ApolloServerPluginDrainHttpServer({ httpServer }),
          // Apagado adecuado para el servidor WebSocket.
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  subscriptionServer.close();
                },
              };
            },
          },
        ],
        uploads: {
          maxFileSize: 10000000, // 10 MB
          maxFiles: 20,
        },
        // Variables accesibles en las consultas
        context: ({ req }: any) => ({
          req,
          isAuth: req.isAuth,
          userService: this.userService,
        }),
        debug: true,
      });

      this.app.use(express.urlencoded({
        limit: '250mb',
        parameterLimit: 500000,
        extended: true,
      }));

      this.app.use(express.json({
        limit: '250mb',
      }));

      this.app.use(graphqlUploadExpress());
      this.app.use(checkAuthGraphql);

      await serverAPolo.start();
      serverAPolo.applyMiddleware({ app: this.app });

      this.app.use(
        morgan('short', {
          stream: {
            write: (message) => logger.info(message.trim()),
          },
        }),
      );

      // Public images
      this.app.use(cors());
      const dir = path.join(_dir, 'public');
      this.app.use(express.static(dir));

      this.app.use(helmet());
      this.app.use(cookieParser());

      // Jobs
      sheduler.initCron(configCron);

      // Initialization server
      httpServer.listen(this.config.PORT, () => {
        console.log(
          `✅ API - ${`${this.config.APPLICATION_NAME} running on: ${this.config.HOST_SERVER}`
          } `,
        );
      });

      resolve();
    });
  }
}

export default Server;
