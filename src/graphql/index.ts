import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import EmailType from './scalar/EmailAddressType';
import PhoneNumberType from './scalar/PhoneNumberType';
import { IsAuthenticatedDirective } from './directive/IsAuthenticatedDirective';

const enrichedResolvers = Object.assign(resolvers, {
  EmailAddress: EmailType,
  PhoneNumber: PhoneNumberType,
});

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: enrichedResolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
  },
});

export { executableSchema };
