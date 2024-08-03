import { Body, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMealEntryDto } from './dto/meal-entry.dto';

@Injectable()
export class MealEntryService {
  constructor(private readonly prismaService: PrismaService) { }
  async getMealEntries(date: Date) {
    return this.prismaService.mealEntry.findMany({ where: { date } });
  }

  async createMealEntry(
    @Body() data: CreateMealEntryDto
  ): Promise<CreateMealEntryDto> {
    return this.prismaService.mealEntry.create({ data });
  }

  async deleteMealEntry(id: number): Promise<CreateMealEntryDto> {
    const mealEntry = await this.prismaService.mealEntry.findUnique({ where: { id } });
    if (!mealEntry) {
      throw new NotFoundException();
    }
    return this.prismaService.mealEntry.delete({ where: { id } });
  }
}
