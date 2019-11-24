import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import EmailType from './scalar/EmailAddressType';
import PhoneNumberType from './scalar/PhoneNumberType';
import { IsAuthenticatedDirective, HasAuthRoleDirective, HasAuthPermDirective } from './directive';

const enrichedResolvers = Object.assign(resolvers, {
  EmailAddress: EmailType,
  PhoneNumber: PhoneNumberType,
});

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: enrichedResolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasAuthRole: HasAuthRoleDirective,
    hasAuthPerm: HasAuthPermDirective,
  },
});

export { executableSchema };
