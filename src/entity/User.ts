import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public phone: string;

  @Column()
  public firstName: string;

  @Column()
  public middleName: string | null;

  @Column()
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
