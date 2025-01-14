import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Req() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(req.userDecoded, createAddressDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.addressService.findAll(req.userDecoded);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.addressService.findOne(+id, req.userDecoded);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto, req.userDecoded);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.addressService.remove(+id, req.userDecoded);
  }
}
