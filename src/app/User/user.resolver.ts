const { ApolloError } = require('apollo-server-core');

export default {
  Query: {
    getInfoUser: async (_: any, arg: any, context: any) => {
      try {
        console.log(_, arg, context);
        const dataUser = {
          error: false,
          response: {
            _id: '625dbb36202004566b6a75d2',
            nombre: 'Carlos Guilarte',
            email: 'test@gmail.com',
          },
        };

        const { error, result }: any = dataUser;

        if (error) {
          throw new ApolloError(result.message);
        }

        return result;
      } catch (err: any) {
        throw new ApolloError(err.message);
      }
    },
  },
  Mutation: {
    addUser: async (_:any, arg:any, context: any) => {
      try {
        const { data } = arg;
        const { error, response } = await context.userService.addUser(data);
        if (error) {
          throw new ApolloError(response.message);
        }
        return response;
      } catch (err: any) {
        throw new ApolloError(err.message);
      }
    },
  },
};
