import { GraphQLField, GraphQLObjectType, defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import { AuthenticationError, AuthorizationError } from 'src/error';
import { IAppContext } from 'src/types';
import getLogger from 'src/logging';

const logger = getLogger(module);

class HasAuthRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve: next = defaultFieldResolver } = field;
    field.resolve = async (result, args, context, info) => {
      if (!context || !context.session || !context.session.currUser) {
        throw new AuthenticationError({
          message: 'Current user is not authenticated',
        });
      }

      const { roles: expectedRoles } = this.args;
      this.validateAuthRoles(context, expectedRoles);

      return next(result, args, context, info);
    };
  }

  visitObject(object: GraphQLObjectType) {
    const fields = object.getFields();
    const { roles: expectedRoles } = this.args;

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve: next = defaultFieldResolver } = field;
      field.resolve = (result, args, context, info) => {
        this.validateAuthRoles(context, expectedRoles);
        return next(result, args, context, info);
      };
    });
  }

  validateAuthRoles(context: IAppContext, expectedRoles: string[]) {
    if (!context || !context.session || !context.session.currUser) {
      throw new AuthenticationError({
        message: 'Current user is not authenticated',
      });
    }

    const roles = context.session.currUser.authRoles;
    if (!expectedRoles.some((role) => roles.includes(role))) {
      logger.error(`User ${context.session.currUser.email} doesn't have any of the following roles: ${expectedRoles.join(',')}` );
      throw new AuthorizationError({
        message: 'You are not authorized to this resource',
      });
    }
  }
}

export { HasAuthRoleDirective };
