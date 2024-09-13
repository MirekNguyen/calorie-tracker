import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomMealEntryDto } from './dto/meal-entry-custom.dto';
import { CreateMealEntryDto } from './dto/meal-entry.dto';

@Injectable()
export class MealEntryService {
  constructor(private readonly prismaService: PrismaService) {}
  async getMealEntries(date: Date) {
    return this.prismaService.mealEntry.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    });
  }

  async createMealEntry(
    @Body() data: CreateMealEntryDto,
  ): Promise<CreateMealEntryDto> {
    const meal = await this.prismaService.meal.findUnique({
      where: { id: data.mealId },
    });
    if (!meal) {
      throw new NotFoundException('Meal could not be found');
    }
    const { amount, date, mealId } = data;
    const { calories, proteins, carbs, fats } = meal;
    return this.prismaService.mealEntry.create({
      data: {
        date,
        calories: calories * amount,
        proteins: proteins * amount,
        carbs: carbs * amount,
        fats: fats * amount,
        mealId: mealId,
        amount: amount,
      },
    });
  }

  async createCustomMealEntry(
    @Body() data: CreateCustomMealEntryDto,
  ): Promise<CreateCustomMealEntryDto> {
    return this.prismaService.mealEntry.create({ data });
  }

  async deleteMealEntry(id: number): Promise<CreateCustomMealEntryDto> {
    const mealEntry = await this.prismaService.mealEntry.findUnique({
      where: { id },
    });
    if (!mealEntry) {
      throw new NotFoundException();
    }
    return this.prismaService.mealEntry.delete({ where: { id } });
  }
}
