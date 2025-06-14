import { Module } from '@nestjs/common';
import { ProductImageService } from './product_image.service';
import { ProductImageController } from './product_image.controller';
import { ProductImageRepository } from './product_image_repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductImageController],
  providers: [ProductImageService, ProductImageRepository],
})
export class ProductImageModule {}
