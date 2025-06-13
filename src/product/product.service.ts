import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './entities/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto, imageUrls: string[] = []) {
    this.productRepository.create(createProductDto);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return this.productRepository.findOneById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.remove(id);
  }
}
