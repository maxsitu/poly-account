import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as yup from 'yup';

@Entity()
class AuthPermission {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
  })
  public name: string;

  @Column()
  public desc: string;

  constructor(id: number, name: string, desc: string) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  }
}

const authPermissionValidationSchema = yup.object().shape({
  name: yup.string().trim().required(),
  desc: yup.string().trim().required(),
});

export { AuthPermission, authPermissionValidationSchema };
