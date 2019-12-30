import { GraphQLField, GraphQLObjectType, defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import { AuthenticationError, AuthorizationError } from '../../error';
import { IAppContext } from '../../types';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const {resolve: next = defaultFieldResolver} = field;
    field.resolve = async (result, args, context, info) => {
      if (!context || !context.session || !context.session.currUser) {
        throw new AuthenticationError({message: 'Current user is not authenticated'});
      }

      return next(result, args, context, info);
    };
  }

  visitObject(object: GraphQLObjectType) {
    const fields = object.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const {resolve: next = defaultFieldResolver} = field;
      field.resolve = (result, args, context, info) => {
        this.validateAuthentication(context);
        return next(result, args, context, info);
      };
    });
  }

  validateAuthentication(context: IAppContext) {
    if (!context || !context.session || !context.session.currUser) {
      throw new AuthenticationError({message: 'Current user is not authenticated'});
    }
  }
}

export { IsAuthenticatedDirective };
