import { Entity, PrimaryColumn, Column } from 'typeorm';
import * as yup from 'yup';
import {UserConstant} from 'src/constant';

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

  constructor(
    id: string,
    username: string,
    email: string,
    phone: string,
    firstName: string,
    middleName: string | null,
    lastName: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }
}

const createUserValidationSchema = yup.object().shape({
  username: yup.string().trim().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(PHONE_REG_EXPR, 'Phone number is not valid'),
  firstName: yup.string().trim().max(FIRST_NAME__MAX_LENGTH).required(),
  middleName: yup.string().trim(),
  lastName: yup.string().trim().max(LAST_NAME__MAX_LENGTH).required(),
});

export {
  User,
  createUserValidationSchema as userValidationSchema,
};
