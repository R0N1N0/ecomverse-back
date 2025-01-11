import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto): Promise<UserEntity> {
    console.log(userData);
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        creationDate: new Date(),
        deletedDate: null,
        state: 'active',
        rol: userData.rol || Role.client,
      },
    });
    return new UserEntity(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOneById(id_user: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id_user },
    });
    return new UserEntity(user);
  }
  async getUserByCriteria(parameters): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: parameters,
    });
    if (!user) return null;
    return new UserEntity(user);
  }

  async update(id_user: number, userData: any): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id_user: id_user },
      data: {
        ...userData,
      },
    });
    return new UserEntity(user);
  }
  async remove(id_user: number): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id_user: id_user },
      data: {
        deletedDate: new Date(),
        state: 'deleted',
      },
    });
    return new UserEntity(user);
  }
}
