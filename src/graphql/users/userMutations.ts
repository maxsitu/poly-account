import { GraphQLNonNull } from 'graphql';
import User from './userType';
import AddUserInput from './addUserInputType';

const userMutations = {
    createUser: {
        type: User,
        args: {
            input: {
                type: new GraphQLNonNull(AddUserInput),
            },
        },
    },
};

export { userMutations as default };
