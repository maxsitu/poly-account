import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import * as yup from 'yup';

import { UserConstant } from 'src/constant';
import { AuthRole } from '../AuthRole';

const PHONE_REG_EXPR = UserConstant.PHONE__REG_EXPR;
const FIRST_NAME__MAX_LENGTH = UserConstant.FIRST_NAME__MAX_LENGTH;
const LAST_NAME__MAX_LENGTH = UserConstant.LAST_NAME__MAX_LENGTH;
const MIDDLE_NAME__MAX_LENGTH = UserConstant.MIDDLE_NAME__MAX_LENGTH;

@Entity()
class User {
  @PrimaryColumn()
  public id: string;

  @Column({
    unique: true,
  })
  public username: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column()
  public phone: string;

  @Column({
    length: 100,
  })
  public firstName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public middleName: string | null;

  @Column({
    length: 100,
  })
  public lastName: string;

  @ManyToMany((t) => AuthRole)
  @JoinTable()
  public roles: AuthRole[];

  constructor(
    id: string,
    username: string,
    email: string,
    phone: string,
    firstName: string,
    middleName: string | null,
    lastName: string,
    roles: AuthRole[],
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.roles = roles;
  }
}

const userValidationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  phone: yup.string().matches(PHONE_REG_EXPR, 'Phone number is not valid'),
  firstName: yup
    .string()
    .trim()
    .max(FIRST_NAME__MAX_LENGTH)
    .required(),
  middleName: yup
    .string()
    .trim()
    .max(MIDDLE_NAME__MAX_LENGTH),
  lastName: yup
    .string()
    .trim()
    .max(LAST_NAME__MAX_LENGTH)
    .required(),
});

export { User, userValidationSchema };
