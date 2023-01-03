/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import isAuthDirective from './directives/auth.directive';

// Schema Type, Query
const typeDefs = loadSchemaSync(path.join(__dirname, '../../app/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// Resolvers
const resolverFiles = loadFilesSync(path.join(__dirname, '../../app/**/*.resolver.*'));
const resolvers = mergeResolvers(resolverFiles);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaDef = isAuthDirective(schema, 'isAuth');

export default schemaDef;
