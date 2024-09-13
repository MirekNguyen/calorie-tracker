import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken";
import { PrismaService } from 'src/prisma/prisma.service';
import { Reflector } from '@nestjs/core';

interface JWTPayload {
  username: string;
  userId: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());
      if (allowUnauthorizedRequest) return true;

      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization.split("Bearer ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
      const user = this.prismaService.user.findUnique({
        where: {
          id: payload.userId
        }
      });
      if (!user) return false;
    } catch {
      return false;
    }
    return true
  }
}
