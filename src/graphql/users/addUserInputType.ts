import { GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Input user payload',
  fields: () => ({
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  }),
});

export { userInputType as default };
