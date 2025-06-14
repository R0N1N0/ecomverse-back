import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './entities/product.repository';
import { CreateProductImageDto } from 'src/product_image/dto/create-product_image.dto';
import { ProductImageService } from 'src/product_image/product_image.service';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository, private productImageService: ProductImageService) {}

  async create(createProductDto: CreateProductDto, imagesInfo: CreateProductImageDto[]) {
    const product = await this.productRepository.create(createProductDto);
    if (imagesInfo && imagesInfo.length > 0) {
      imagesInfo = imagesInfo.map(image => ({
        productId: product.id_product,
        name: image.name,
        url: image.url
      }));
    }
    const productImages = await this.productImageService.createMany(imagesInfo);
    return { ...product, images: productImages };
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
