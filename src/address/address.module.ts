import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressRepository } from './address.repository';
import { AuthMiddleware } from 'src/auth/middlewares/authMiddleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, AuthMiddleware],
})
export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AddressController);
  }
}
