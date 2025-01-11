import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/auth/middlewares/authMiddleware';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthMiddleware],
})
export class UserModule {
  configure(consumer: any) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PATCH },
        { path: 'user', method: RequestMethod.DELETE },
      );
  }
}
