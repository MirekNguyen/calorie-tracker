import { IsDate, IsNumber, IsPositive } from 'class-validator';
export class CreateMealEntryDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  mealId: number;

  @IsDate()
  date: Date;
}
