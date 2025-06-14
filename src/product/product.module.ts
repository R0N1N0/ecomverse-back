import { Module, RequestMethod } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductRepository } from './entities/product.repository';
import { AuthMiddleware } from 'src/auth/middlewares/authMiddleware';
import { RolMiddleware } from 'src/auth/middlewares/rolMiddleware';
import { ProductImageService } from 'src/product_image/product_image.service';
import { ProductImageRepository } from 'src/product_image/product_image_repository';
import { JwtModule } from '@nestjs/jwt';
import { S3Service } from 'src/bucket-aws/s3-service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, AuthMiddleware, S3Service, ProductImageService, ProductImageRepository],
})
export class ProductModule {
  configure(consumer: any) {
    consumer
      .apply(AuthMiddleware, new RolMiddleware(['admin']))
      .forRoutes(
        { path: 'product', method: RequestMethod.POST },
        { path: 'product', method: RequestMethod.PATCH },
        { path: 'product', method: RequestMethod.DELETE },
      );
  }
}
