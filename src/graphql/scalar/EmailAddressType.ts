import {EmailAddressResolver} from 'graphql-scalars';
import { GraphQLScalarType } from 'graphql';

const emailAddressType: GraphQLScalarType = new GraphQLScalarType(EmailAddressResolver);

export {
    emailAddressType as default,
};
