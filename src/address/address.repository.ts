import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userDecoded: UserEntity,
    addressData: CreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.prisma.address.create({
      data: {
        ...addressData,
        id_user: userDecoded.id_user,
        creationDate: new Date(),
        deletedDate: null,
        state: addressData.state || 'active',
      },
    });
    return new AddressEntity(address);
  }

  async findAll(userDecoded: UserEntity) {
    const addresses = await this.prisma.address.findMany({
      where: { id_user: userDecoded.id_user, state: 'active' },
    });
    return addresses;
  }

  async findOne(
    id_address: number,
    userDecoded: UserEntity,
  ): Promise<AddressEntity> {
    const address = await this.prisma.address.findUnique({
      where: { id_address: id_address, id_user: userDecoded.id_user },
    });
    return new AddressEntity(address);
  }

  async update(
    id: number,
    addressData: UpdateAddressDto,
    userDecoded: UserEntity,
  ): Promise<AddressEntity> {
    const address = await this.prisma.address.update({
      where: { id_address: id, id_user: userDecoded.id_user },
      data: addressData,
    });
    return new AddressEntity(address);
  }

  async remove(id: number, userDecoded: UserEntity): Promise<AddressEntity> {
    const address = await this.prisma.address.update({
      where: { id_address: id, id_user: userDecoded.id_user },
      data: { state: 'deleted', deletedDate: new Date() },
    });
    return new AddressEntity(address);
  }
}
