import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { State } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(100)
  price: number;

  @IsString()
  @IsNotEmpty()
  state: State;
}
