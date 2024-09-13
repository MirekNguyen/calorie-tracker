import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) { }
  async signIn(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { username } });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }
    return jwt.sign({ username, userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}
