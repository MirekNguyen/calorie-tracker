import { Controller, Get } from '@nestjs/common';
import { MealResponseDto } from './dto/meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  getMeals(): Promise<MealResponseDto[]> {
    return this.mealService.getMeals();
  }
}
