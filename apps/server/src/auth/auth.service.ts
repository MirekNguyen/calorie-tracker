import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signIn(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }
    return jwt.sign({ username, userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
