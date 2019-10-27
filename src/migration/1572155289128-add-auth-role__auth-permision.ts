import {MigrationInterface, QueryRunner} from "typeorm";

export class addAuthRole_authPermision1572155289128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "auth_permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "UQ_b5905e41a210003850c13f7c531" UNIQUE ("name"), CONSTRAINT "PK_a7f146f631691c4a595af1dbf89" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "auth_role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying NOT NULL, CONSTRAINT "UQ_dd2dc743f4acaa5343a5b8c7685" UNIQUE ("name"), CONSTRAINT "PK_695d9779f1a6218ed589cb436d6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "auth_role_permissions_auth_permission" ("authRoleId" integer NOT NULL, "authPermissionId" integer NOT NULL, CONSTRAINT "PK_582adb29c372052b3f1dfa5b293" PRIMARY KEY ("authRoleId", "authPermissionId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_adef7b9439590d138da6b7d119" ON "auth_role_permissions_auth_permission" ("authRoleId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_bcdf0c55b5d330f5256cf87c06" ON "auth_role_permissions_auth_permission" ("authPermissionId") `, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles_auth_role" ("userId" character varying NOT NULL, "authRoleId" integer NOT NULL, CONSTRAINT "PK_c234571fd03731e2a836feae546" PRIMARY KEY ("userId", "authRoleId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_053637d73a7d64e99fc2a1d060" ON "user_roles_auth_role" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d0e0b6c9b7aabde8db766214d9" ON "user_roles_auth_role" ("authRoleId") `, undefined);
        await queryRunner.query(`ALTER TABLE "auth_role_permissions_auth_permission" ADD CONSTRAINT "FK_adef7b9439590d138da6b7d1197" FOREIGN KEY ("authRoleId") REFERENCES "auth_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "auth_role_permissions_auth_permission" ADD CONSTRAINT "FK_bcdf0c55b5d330f5256cf87c06c" FOREIGN KEY ("authPermissionId") REFERENCES "auth_permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_auth_role" ADD CONSTRAINT "FK_053637d73a7d64e99fc2a1d0602" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_auth_role" ADD CONSTRAINT "FK_d0e0b6c9b7aabde8db766214d9c" FOREIGN KEY ("authRoleId") REFERENCES "auth_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_roles_auth_role" DROP CONSTRAINT "FK_d0e0b6c9b7aabde8db766214d9c"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_auth_role" DROP CONSTRAINT "FK_053637d73a7d64e99fc2a1d0602"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth_role_permissions_auth_permission" DROP CONSTRAINT "FK_bcdf0c55b5d330f5256cf87c06c"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth_role_permissions_auth_permission" DROP CONSTRAINT "FK_adef7b9439590d138da6b7d1197"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d0e0b6c9b7aabde8db766214d9"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_053637d73a7d64e99fc2a1d060"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles_auth_role"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_bcdf0c55b5d330f5256cf87c06"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_adef7b9439590d138da6b7d119"`, undefined);
        await queryRunner.query(`DROP TABLE "auth_role_permissions_auth_permission"`, undefined);
        await queryRunner.query(`DROP TABLE "auth_role"`, undefined);
        await queryRunner.query(`DROP TABLE "auth_permission"`, undefined);
    }

}
