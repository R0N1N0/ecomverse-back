import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ProductImageModule } from './product_image/product_image.module';

@Module({
  imports: [
    UserModule,
    AddressModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    ProductModule,
    ProductImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
