import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsDate,
  ValidateIf,
} from 'class-validator';
import { Role } from '@prisma/client';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(255)
  @ValidateIf((object, value) => value !== null)
  password: string | null;
}
