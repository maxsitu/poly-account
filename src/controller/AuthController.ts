import { Connection, Repository } from 'typeorm';

import {
  AuthRole,
  authRoleValidationSchema,
} from 'src/entity/AuthRole/AuthRole';
import {
  AuthPermission,
  authPermissionValidationSchema,
} from 'src/entity/AuthPermission/AuthPermission';
import getLogger from 'src/logging';

const logger = getLogger(module);

class AuthController {
  public authRoleRepo: Repository<AuthRole>;
  public authPermissionRepo: Repository<AuthPermission>;

  constructor(connection: Connection) {
    this.authRoleRepo = connection.getRepository(AuthRole);
    this.authPermissionRepo = connection.getRepository(AuthPermission);
  }

  public async getAuthRole(name: string): Promise<AuthRole | null> {
    const authRole: AuthRole | undefined = await this.authRoleRepo.findOne({
      where: { name },
    });
    return authRole || null;
  }

  public async getAllAuthRoles(): Promise<AuthRole[]> {
    return await this.authRoleRepo.find();
  }

  public async createAuthRole(name: string, desc: string) {
    const authRoleToCreate = {
      name,
      desc,
    };
    logger.debug(
      `validating authRoleToCreate:`,
      JSON.stringify(authRoleToCreate),
    );
    const result = await authRoleValidationSchema.validate(authRoleToCreate);

    logger.debug(`creating user`);
    const authRole: AuthRole = this.authRoleRepo.create(authRoleToCreate);

    return this.authRoleRepo.save(authRole);
  }

  public async getAuthPermission(name: string): Promise<AuthPermission | null> {
    const authPermission:
      | AuthPermission
      | undefined = await this.authPermissionRepo.findOne({ where: { name } });
    return authPermission || null;
  }

  public async getAllAuthPermissions(): Promise<AuthPermission[]> {
    return await this.authPermissionRepo.find();
  }

  public async createAuthPermission(name: string, desc: string) {
    const authPermissionToCreate = {
      name,
      desc,
    };
    logger.debug(
      `validating authPermissionToCreate:`,
      JSON.stringify(authPermissionToCreate),
    );
    const result = await authPermissionValidationSchema.validate(authPermissionToCreate);

    logger.debug(`creating user`);
    const authPermission: AuthPermission = this.authPermissionRepo.create(authPermissionToCreate);

    return this.authPermissionRepo.save(authPermission);
  }
}

export { AuthController, AuthController as default };
