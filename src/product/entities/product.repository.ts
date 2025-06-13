import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { State } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(productData: any): Promise<ProductEntity> {
    const product = await this.prisma.product.create({
      data: {
        ...productData,
      },
    });
    return new ProductEntity(product);
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOneById(id_product: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findUnique({
      where: { id_product },
    });
    return new ProductEntity(product);
  }

  async update(id_product: number, productData: any): Promise<ProductEntity> {
    const product = await this.prisma.product.update({
      where: { id_product: id_product },
      data: {
        ...productData,
      },
    });
    return new ProductEntity(product);
  }

  async remove(id_product: number) {
    const product = await this.prisma.product.update({
      where: { id_product: id_product },
      data: {
        state: State.deleted,
      },
    });
    return product;
  }
}
