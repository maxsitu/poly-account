import {PhoneNumberResolver} from 'graphql-scalars';
import { GraphQLScalarType } from 'graphql';

const phoneNumberType = new GraphQLScalarType(PhoneNumberResolver);

export {
    phoneNumberType as default,
};
