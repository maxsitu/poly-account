import { User } from '../../entity/User';
import { AuthRole } from '../../entity/AuthRole';
import { AuthPermission } from '../../entity/AuthPermission';

interface IAuthPermission {
  name: string;
  desc: string;
}

interface IAuthRole {
  name: string;
  desc: string;
  permissions: IAuthPermission[];
}

interface IAuthUser {
  email: string;
  isActive: boolean;
  phone: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  authRoles: string[];
  authPermissions: string[];
}

interface IAuthPayload {
  user: IAuthUser;
}

function mapUserToIAuthUser(user: User): IAuthUser {
  const { email, isActive, phone, firstName, middleName, lastName } = user;
  const authRoles: string[] = user.roles.map(({ name }: AuthRole) => name);
  const authPermissions: string[] = Array.from(
    user.getPermissions(),
    ({ name }: AuthPermission) => name,
  );

  return {
    email,
    isActive,
    phone,
    firstName,
    middleName,
    lastName,
    authRoles,
    authPermissions,
  };
}

function mapAuthRoleToIAuthRole(authRole: AuthRole): IAuthRole {
  const {name, desc, permissions} = authRole;
  const perms = (permissions ? permissions.map(mapAuthPermissionToIAuthPermission) : []);
  return {
    name,
    desc,
    permissions: perms,
  };
}

function mapAuthPermissionToIAuthPermission(authPermission: AuthPermission): IAuthPermission {
  const {name, desc} = authPermission;

  return {
    name,
    desc,
  };
}

export {
  IAuthPermission,
  IAuthRole,
  IAuthUser,
  IAuthPayload,
  mapUserToIAuthUser,
  mapAuthRoleToIAuthRole,
  mapAuthPermissionToIAuthPermission,
};
