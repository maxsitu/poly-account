import { IAuthRole, IAuthPermission } from 'src/graphql/interface';
import { IAppContext } from 'src/types';
import { mapAuthRoleToIAuthRole, mapAuthPermissionToIAuthPermission } from '../interface/auth';

interface IGetAuthRoleArgs {
  name: string;
}

type IGetAuthPermissionArgs = IGetAuthRoleArgs;

async function getAuthRole(
  _: any,
  { name }: IGetAuthRoleArgs,
  context: IAppContext,
): Promise<IAuthRole | null> {
  const authRole = await context.authController.getAuthRole(name);

  return authRole && mapAuthRoleToIAuthRole(authRole);
}

async function allAuthRoles(
  _: any,
  __: object,
  context: IAppContext,
): Promise<IAuthRole[]> {
  const roles = await context.authController.getAllAuthRoles();
  return roles.map(mapAuthRoleToIAuthRole);
}

async function getAuthPermission(
  _: any,
  { name }: IGetAuthPermissionArgs,
  context: IAppContext,
): Promise<IAuthPermission | null> {
  const authPermission = await context.authController.getAuthPermission(name);

  return authPermission && mapAuthPermissionToIAuthPermission(authPermission);
}

async function allAuthPermissions(
  _: any,
  __: object,
  context: IAppContext,
): Promise<IAuthPermission[]> {
  const perms = await context.authController.getAllAuthPermissions();
  return perms.map(mapAuthPermissionToIAuthPermission);
}

export { IGetAuthRoleArgs, IGetAuthPermissionArgs };

export default {
  Query: {
    authRole: getAuthRole,
    authRoles: allAuthRoles,
    authPermission: getAuthPermission,
    authPermissions: allAuthPermissions,
  },
  Mutation: {
    // TODO: Add auth mutation methods
  },
};
