import * as yup from 'yup';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { AuthPermission } from '../AuthPermission/AuthPermission';

@Entity()
class AuthRole {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
  })
  public name: string;

  @Column()
  public desc: string;

  @ManyToMany((t) => AuthPermission)
  @JoinTable()
  public permissions: AuthPermission[];

  constructor(id: number, name: string, desc: string, permissions: AuthPermission[]) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.permissions = permissions;
  }
}

const authRoleValidationSchema = yup.object().shape({
  name: yup.string().trim().required(),
  desc: yup.string().trim().required(),
});

export { AuthRole, authRoleValidationSchema };
