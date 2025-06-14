import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductImage } from './entities/product_image.entity';

export class ProductImageRepository {
    constructor(private prisma: PrismaService) {}
    
    async create(imageInfo: any): Promise<ProductImage> {
        const product_image = await this.prisma.productImage.create({
            data: {
                ...imageInfo,
            },
        });
        return new ProductImage(product_image);
    }
}