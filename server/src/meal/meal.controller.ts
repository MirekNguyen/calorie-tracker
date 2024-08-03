import { Controller, Get } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealResponseDto } from './dto/meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  getMeals(): Promise<MealResponseDto[]> {
    return this.mealService.getMeals();
  }
}
