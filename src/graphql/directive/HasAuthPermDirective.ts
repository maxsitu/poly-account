import { GraphQLField, GraphQLObjectType, defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import { AuthenticationError, AuthorizationError } from '../../error';
import { IAppContext } from '../../types';
import getLogger from '../../logging';

const logger = getLogger(module);

class HasAuthPermDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve: next = defaultFieldResolver } = field;
    field.resolve = async (result, args, context, info) => {
      if (!context || !context.session || !context.session.currUser) {
        throw new AuthenticationError({
          message: 'Current user is not authenticated',
        });
      }

      const { perm: expectedPerm } = this.args;
      this.validateAuthPerm(context, expectedPerm);

      return next(result, args, context, info);
    };
  }

  visitObject(object: GraphQLObjectType) {
    const fields = object.getFields();
    const { perm: expectedPerm } = this.args;

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve: next = defaultFieldResolver } = field;
      field.resolve = (result, args, context, info) => {
        this.validateAuthPerm(context, expectedPerm);
        return next(result, args, context, info);
      };
    });
  }

  validateAuthPerm(context: IAppContext, expectedPerm: string) {
    if (!context || !context.session || !context.session.currUser) {
      throw new AuthenticationError({
        message: 'Current user is not authenticated',
      });
    }

    const perms = context.session.currUser.authPermissions;
    if (!perms.includes(expectedPerm)) {
      logger.error(`User ${context.session.currUser.email} doesn't have the following permission: ${expectedPerm}` );
      throw new AuthorizationError({
        message: 'You are not authorized to this resource',
      });
    }
  }
}

export { HasAuthPermDirective };
