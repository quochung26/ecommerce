import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    if (token) {
      const jwtConfig = this.configService.get('jwt');
      let payload = null;
      try {
        payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConfig.secret,
        });
      } catch (e) {}
      if (payload?.customer) req['customer'] = payload.customer;
      if (payload?.user) req['user'] = payload.user;
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
