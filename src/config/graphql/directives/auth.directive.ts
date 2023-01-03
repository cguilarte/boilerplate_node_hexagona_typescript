/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { GraphQLError, defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

const isAuthDirective = (schema: any, directiveName: any) => mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: (fieldConfig: any) => {
    const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
    if (upperDirective) {
      const { resolve = defaultFieldResolver } = fieldConfig;

      fieldConfig.resolve = async function (source: unknown, args: unknown, context: any, info: unknown) {
        const { isAuth } = context;
        if (isAuth) {
          const result = await resolve(source, args, context, info);
          return result;
        }
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      };
      return fieldConfig;
    }
  },
});

export default isAuthDirective;
