import { ApolloError, ErrorConfig } from 'apollo-errors';

class AuthorizationError extends ApolloError {
  constructor(ctorConfig: ErrorConfig) {
    super('AuthorizationError',  {
      message: 'You are not authorized.',
    }, ctorConfig);
  }
}

export { AuthorizationError };
