import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  create(userEncoded: UserEntity, createAddressDto: CreateAddressDto) {
    this.addressRepository.create(userEncoded, createAddressDto);
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
