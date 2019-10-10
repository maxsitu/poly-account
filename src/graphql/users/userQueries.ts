import {GraphQLList, GraphQLID} from 'graphql';
import User from './userType';

const userQueries = {
    users: {
        type: GraphQLList(User),
    },
    user: {
        type: User,
        args: {
            id: {
                type: GraphQLID,
            },
        },
    },
};

export {
    userQueries as default,
};
