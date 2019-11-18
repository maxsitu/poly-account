import { User } from 'src/entity/User';
import { AuthRole } from 'src/entity/AuthRole';
import { AuthPermission } from 'src/entity/AuthPermission';

interface IAuthPermission {
  name: string;
  desc: string;
}

interface IAuthRole {
  name: string;
  desc: string;
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
  token: string;
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

export {
  IAuthPermission,
  IAuthRole,
  IAuthUser,
  IAuthPayload,
  mapUserToIAuthUser,
};
