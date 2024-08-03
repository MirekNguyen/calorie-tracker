import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService],
})
export class MealModule {}
