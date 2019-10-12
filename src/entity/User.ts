import { Entity, PrimaryColumn, Column } from 'typeorm';

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

export { User as default };
