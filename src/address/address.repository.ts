import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userEncoded: UserEntity,
    addressData: CreateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.prisma.address.create({
      data: {
        ...addressData,
        id_user: userEncoded.id_user,
        creationDate: new Date(),
        deletedDate: null,
        state: addressData.state || 'active',
      },
    });
    return new AddressEntity(address);
  }
}
