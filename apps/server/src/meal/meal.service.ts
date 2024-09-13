import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MealResponseDto } from './dto/meal.dto';

@Injectable()
export class MealService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMeals(): Promise<MealResponseDto[]> {
    return this.prismaService.meal.findMany();
  }
}
