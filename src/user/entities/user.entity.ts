import { Role } from '@prisma/client';
import { AddressEntity } from 'src/address/entities/address.entity';
import * as bcrypt from 'bcrypt';

export class UserEntity {
  id_user: number;
  firstName: string;
  lastName: string;
  password: string;
  birthdate: Date;
  email: string;
  creationDate: Date;
  deletedDate?: Date | null;
  state: string;
  rol: Role;

  // Relaciones
  addresses?: AddressEntity[];

  constructor(partial: Partial<UserEntity>) {
    if (partial.id_user !== undefined) this.setUser(partial.id_user);
    if (partial.firstName !== undefined) this.setFirstName(partial.firstName);
    if (partial.lastName !== undefined) this.setLastName(partial.lastName);
    if (partial.password !== undefined) this.setPassword(partial.password);
    if (partial.birthdate !== undefined) this.setBirthdate(partial.birthdate);
    if (partial.email !== undefined) this.setEmail(partial.email);
    if (partial.creationDate !== undefined)
      this.setCreationDate(partial.creationDate);
    if (partial.deletedDate !== undefined)
      this.setDeletedDate(partial.deletedDate);
    if (partial.state !== undefined) this.setState(partial.state);
    if (partial.rol !== undefined) this.setRol(partial.rol);
    if (partial.addresses !== undefined) this.setAddresses(partial.addresses);
  }

  getIdUser() {
    return this.id_user;
  }

  setUser(value: number) {
    this.id_user = value;
  }

  getFirstName() {
    return this.firstName;
  }

  setFirstName(value: string) {
    this.firstName = value;
  }

  getLastName() {
    return this.lastName;
  }

  setLastName(value: string) {
    this.lastName = value;
  }

  getPassword() {
    return this.password;
  }

  setPassword(value: string) {
    this.password = value;
  }

  getBirthdate() {
    return this.birthdate;
  }

  setBirthdate(value: Date) {
    this.birthdate = value;
  }

  getCreationDate() {
    return this.creationDate;
  }

  setCreationDate(value: Date) {
    this.creationDate = value;
  }

  getDeletedDate() {
    return this.deletedDate;
  }

  setDeletedDate(value: Date | null | undefined) {
    this.deletedDate = value;
  }

  getState() {
    return this.state;
  }

  setState(value: string) {
    this.state = value;
  }

  getRol() {
    return this.rol;
  }

  setRol(value: Role) {
    this.rol = value;
  }

  getAddresses() {
    return this.addresses;
  }

  setAddresses(value: AddressEntity[] | undefined) {
    this.addresses = value;
  }
  setEmail(value: string) {
    this.email = value;
  }
  getEmail() {
    return this.email;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async validatePassword(value: string) {
    return await bcrypt.compare(value, this.password);
  }
}
