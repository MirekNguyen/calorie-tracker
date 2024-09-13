import { Module } from '@nestjs/common';
import { MealEntryController } from './meal-entry.controller';
import { MealEntryService } from './meal-entry.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MealEntryController],
  providers: [MealEntryService, PrismaService]
})
export class MealEntryModule {}
