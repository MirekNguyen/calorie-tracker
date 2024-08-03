import { IsDate } from "class-validator";

export class DateType {
  @IsDate()
  date: Date;
}
