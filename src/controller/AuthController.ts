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
      relations: ['permissions'],
    });
    return authRole || null;
  }

  public async getAllAuthRoles(): Promise<AuthRole[]> {
    return await this.authRoleRepo.find({ relations: ['permissions'] });
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

  public async updateAuthRole(
    name: string,
    desc: string, permissions?: string[],
  ): Promise<AuthRole> {
    const authRole = await this.getAuthRole(name);
    if (!authRole) {
      throw new Error(`role ${name} not found`);
    }

    if ((!!desc && desc !== authRole.desc) || !!permissions) {
      authRole.desc = desc;

      if (permissions !== undefined) {
        const perms: AuthPermission[] = new Array<AuthPermission>();
        for (const permName of permissions) {
          const permission = await this.getAuthPermission(permName);
          if (!permission) {
            throw new Error(`permission ${permName} not found`);
          }

          perms.push(permission);
        }
        authRole.permissions = perms;
      }

      logger.debug(`updating role ${JSON.stringify(authRole)}`);
      return this.authRoleRepo.save(authRole);
    } else {
      throw new Error('nothing to update');
    }
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

  public async createAuthPermission(name: string, desc: string): Promise<AuthPermission> {
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

  public async updateAuthPermission(name: string, desc: string): Promise<AuthPermission> {
    const authPermission = await this.getAuthPermission(name);
    if (!authPermission) {
      throw new Error(`permission ${name} not found`);
    }

    if (authPermission.desc !== desc) {
      authPermission.desc = desc;

      logger.debug(`updating permission ${JSON.stringify(authPermission)}`);
      return this.authPermissionRepo.save(authPermission);
    } else {
      throw new Error('nothing to update');
    }
  }
}

export { AuthController, AuthController as default };
