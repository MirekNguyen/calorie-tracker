import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService],
})
export class MealModule {}
