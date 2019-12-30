import * as yup from 'yup';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';

import { UserConstant } from '../../constant';
import { AuthRole } from '../AuthRole';
import { AuthPermission } from '../AuthPermission';

const PHONE_REG_EXPR = UserConstant.PHONE__REG_EXPR;
const FIRST_NAME__MAX_LENGTH = UserConstant.FIRST_NAME__MAX_LENGTH;
const LAST_NAME__MAX_LENGTH = UserConstant.LAST_NAME__MAX_LENGTH;
const MIDDLE_NAME__MAX_LENGTH = UserConstant.MIDDLE_NAME__MAX_LENGTH;

@Entity()
class User {
  @PrimaryColumn('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('boolean', {
    default: () => false,
  })
  isActive: boolean;

  @Column('varchar', {
    nullable: true,
  })
  phone: string | null;

  @Column('varchar', {
    nullable: true,
  })
  firstName: string | null;

  @Column('varchar', {
    length: 100,
    nullable: true,
  })
  middleName: string | null;

  @Column('varchar', {
    nullable: true,
  })
  lastName: string | null;

  @ManyToMany((t) => AuthRole)
  @JoinTable()
  roles: AuthRole[];

  @CreateDateColumn({ type: 'timestamptz', default: () => `(now() at time zone 'utc')` })
  createdAt: Date;

  getPermissions(): Set<AuthPermission> {
    const result = new Set<AuthPermission>();
    this.roles.forEach((role) => {
      if (role.permissions) {
        role.permissions.forEach((perm) => {
          result.add(perm);
        });
      }
    });

    return result;
  }
}

const userValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  isActive: yup.boolean(),
  phone: yup.string().matches(PHONE_REG_EXPR, 'Phone number is not valid'),
  firstName: yup
    .string()
    .trim()
    .max(FIRST_NAME__MAX_LENGTH),
  middleName: yup
    .string()
    .trim()
    .max(MIDDLE_NAME__MAX_LENGTH),
  lastName: yup
    .string()
    .trim()
    .max(LAST_NAME__MAX_LENGTH),
});

export { User, userValidationSchema };
