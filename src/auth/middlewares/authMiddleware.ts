import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return new UnauthorizedException('Token missing');
    }

    try {
      const decoded = this.jwt.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      req.userDecoded = decoded;
      next();
    } catch (err) {
      return new UnauthorizedException('Invalid token');
    }
  }
}
