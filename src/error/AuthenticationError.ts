import { ApolloError, ErrorConfig } from 'apollo-errors';

class AuthenticationError extends ApolloError {
  constructor(ctorConfig: ErrorConfig) {
    super('AuthenticationError',  {
      message: 'You are not authenticated.',
    }, ctorConfig);
  }
}

export { AuthenticationError };
