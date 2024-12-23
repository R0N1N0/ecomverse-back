import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsDate,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(8)
  password: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsIn(['admin', 'client', 'helpdesk'])
  rol: Role;
}
