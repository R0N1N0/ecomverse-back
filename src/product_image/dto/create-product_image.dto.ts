import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    MaxLength,
  } from 'class-validator';

export class CreateProductImageDto {
    @IsOptional()
    @IsNumber()
    id_product?: number;

    @IsOptional()
    @IsNumber()
    id_variant?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;
}
