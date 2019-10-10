import { GraphQLSchema, GraphQLObjectType} from 'graphql';

import userQueries from './users/userQueries';
import userMutations from './users/userMutations';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            ...userQueries,
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            ...userMutations,
        }),
    }),
});

export { schema as default };
