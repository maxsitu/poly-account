import { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import EmailAddressType from '../utils/EmailAddressType';
import PhoneNumberType from '../utils/PhoneNumberType';

/**
 * Using our shorthand to describe type systems, the type systme for our
 * Account Service is:
 *
 * type User {
 *  id: ID!
 *  username: String!
 *  firstName: String!
 *  middleName: String
 *  lastName: String!
 * }
 */

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user in account service universe',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'The id of user',
        },
        username: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The username of user',
        },
        email: {
            type: GraphQLNonNull(EmailAddressType),
            description: 'The email of user',
        },
        phone: {
            type: PhoneNumberType,
            description: 'The phone number of user',
        },
        firstName: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The first name of user',
        },
        middleName: {
            type: GraphQLString,
            description: 'The middle name of user',
        },
        lastName: {
            type: GraphQLNonNull(GraphQLString),
            description: 'The last name of user',
        },
    }),
});

export {
    userType as default,
};
