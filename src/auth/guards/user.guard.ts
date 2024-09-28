import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    
    try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.jwtSecretKey,
        });
        request['user'] = payload;

      const requestedUserId = request.params.userId;
      if (requestedUserId && requestedUserId !== payload.id) {
        throw new UnauthorizedException('You can only access your own data');
      }

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(type, token);
    return type === 'Bearer' ? token : undefined;
  }
}
