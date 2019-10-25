import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import EmailType from './scalar/EmailAddressType';
import PhoneNumberType from './scalar/PhoneNumberType';

const enrichedResolvers = Object.assign(resolvers, {
  Email: EmailType,
  PhoneNumber: PhoneNumberType,
});

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: enrichedResolvers,
});

export { executableSchema };
