import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { MealEntryService } from './meal-entry.service';
import { CreateCustomMealEntryDto } from './dto/meal-entry-custom.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMealEntryDto } from './dto/meal-entry.dto';

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

  @Post('custom')
  @UseGuards(AuthGuard)
  createCustomMealEntry(
    @Body() mealEntry: CreateCustomMealEntryDto,
  ) {
    return this.mealEntryService.createCustomMealEntry(mealEntry);
  }

  @Delete(':id')
  deleteMealEntry(@Param('id', ParseIntPipe) id: number) {
    console.log('Deleting meal with id: ', id);
    return this.mealEntryService.deleteMealEntry(id);
  }
}
