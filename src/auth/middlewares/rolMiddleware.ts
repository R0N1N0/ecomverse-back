import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RolMiddleware implements NestMiddleware {
  constructor(private readonly requiredRoles: string[]) {}

  use(req: any, res: any, next: () => void) {
    const { rol } = req.userDecoded;

    if (!this.requiredRoles.includes(rol)) {
      return new UnauthorizedException(
        'You do not have the required permissions',
      );
    }

    next();
  }
}
