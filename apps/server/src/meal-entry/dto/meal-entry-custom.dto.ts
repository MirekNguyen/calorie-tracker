import { IsDate, IsNumber, IsPositive } from 'class-validator';
export class CreateCustomMealEntryDto {
  @IsNumber()
  @IsPositive()
  proteins: number;

  @IsNumber()
  @IsPositive()
  calories: number;

  @IsNumber()
  @IsPositive()
  carbs: number;

  @IsNumber()
  @IsPositive()
  fats: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsDate()
  date: Date;
}
