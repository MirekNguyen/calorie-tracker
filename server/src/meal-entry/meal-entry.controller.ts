import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { MealEntryService } from './meal-entry.service';
import { CreateMealEntryDto } from './dto/meal-entry.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('meal-entry')
export class MealEntryController {
  constructor(private readonly mealEntryService: MealEntryService) { }

  @Get()
  getMealEntries(@Query('date') date: string) {
    return this.mealEntryService.getMealEntries(new Date(date));
  }

  @Post()
  @UseGuards(AuthGuard)
  createMealEntry(
    @Body() mealEntry: CreateMealEntryDto,
  ) {
    return this.mealEntryService.createMealEntry(mealEntry);
  }

  @Delete(':id')
  deleteMealEntry(@Param('id', ParseIntPipe) id: number) {
    return this.mealEntryService.deleteMealEntry(id);
  }
}
