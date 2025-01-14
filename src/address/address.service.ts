import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  async create(userDecoded: UserEntity, createAddressDto: CreateAddressDto) {
    return this.addressRepository.create(userDecoded, createAddressDto);
  }

  async findAll(userDecoded: UserEntity) {
    const addresses = await this.addressRepository.findAll(userDecoded);
    if (!addresses) {
      throw new UnauthorizedException('Addresses not found');
    }
    return addresses;
  }

  async findOne(id: number, userDecoded: UserEntity) {
    const address = await this.addressRepository.findOne(id, userDecoded);
    if (!address) {
      throw new UnauthorizedException('Address not found');
    }
    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
    userDecoded: UserEntity,
  ) {
    const isHisAddress = await this.isHisAddress(id, userDecoded);
    if (!isHisAddress) {
      throw new UnauthorizedException("You can't update this address");
    }
    return this.addressRepository.update(id, updateAddressDto, userDecoded);
  }

  async remove(id: number, userDecoded: UserEntity) {
    const isHisAddress = await this.isHisAddress(id, userDecoded);
    if (!isHisAddress) {
      throw new UnauthorizedException("You can't update this address");
    }
    return this.addressRepository.remove(id, userDecoded);
  }

  async isHisAddress(id_address: number, userDecoded: UserEntity) {
    const address = await this.addressRepository.findOne(
      id_address,
      userDecoded,
    );
    return !!address;
  }
}
