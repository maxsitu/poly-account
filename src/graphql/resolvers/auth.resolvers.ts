import { IAuthRole, IAuthPermission } from '../../graphql/interface';
import { IAppContext } from '../../types';
import { mapAuthRoleToIAuthRole, mapAuthPermissionToIAuthPermission } from '../interface/auth';

interface IGetAuthRoleArgsType {
  name: string;
}

interface IGetAuthPermissionArgsType {
  name: string;
}

interface ICreateAuthRoleArgsType {
  name: string;
  desc: string;
}


interface IModifyAuthRoleArgsType {
  name: string;
  desc: string;
  permissions?: string[];
}

interface ICreateAuthPermissionArgsType {
  name: string;
  desc: string;
}

interface IModifyAuthPermissionArgsType {
  name: string;
  desc: string;
}

async function getAuthRole(
  _: any,
  { name }: IGetAuthRoleArgsType,
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
  { name }: IGetAuthPermissionArgsType,
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

async function createAuthRole(
  _: any,
  { name, desc }: ICreateAuthRoleArgsType,
  context: IAppContext,
): Promise<IAuthRole> {
  const role = await context.authController.createAuthRole(name, desc);
  return mapAuthRoleToIAuthRole(role);
}

async function modifyAuthRole(
  _: any,
  { name, desc, permissions }: IModifyAuthRoleArgsType,
  context: IAppContext,
): Promise<IAuthRole> {
  const role = await context.authController.updateAuthRole(name, desc, permissions);
  return mapAuthRoleToIAuthRole(role);
}

async function createAuthPermission(
  _: any,
  { name, desc }: ICreateAuthPermissionArgsType,
  context: IAppContext,
): Promise<IAuthPermission> {
  const perm = await context.authController.createAuthPermission(name, desc);
  return mapAuthPermissionToIAuthPermission(perm);
}

async function modifyAuthPermission(
  _: any,
  { name, desc }: IModifyAuthPermissionArgsType,
  context: IAppContext,
): Promise<IAuthPermission> {
  const perm = await context.authController.updateAuthPermission(name, desc);
  return mapAuthPermissionToIAuthPermission(perm);
}

export {
  IGetAuthRoleArgsType,
  IGetAuthPermissionArgsType,
  ICreateAuthRoleArgsType,
  IModifyAuthPermissionArgsType,
};

export default {
  Query: {
    authRole: getAuthRole,
    authRoles: allAuthRoles,
    authPermission: getAuthPermission,
    authPermissions: allAuthPermissions,
  },
  Mutation: {
    createAuthRole,
    modifyAuthRole,
    createAuthPermission,
    modifyAuthPermission,
  },
};
