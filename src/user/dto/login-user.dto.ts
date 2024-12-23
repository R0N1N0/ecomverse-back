import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;
}
