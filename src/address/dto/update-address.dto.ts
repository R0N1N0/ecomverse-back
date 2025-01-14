import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  @MaxLength(255)
  additionalData?: string | null;

  @IsString()
  @MaxLength(255)
  description?: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  population: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  province: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @MaxLength(255)
  predetermined: boolean;
}
