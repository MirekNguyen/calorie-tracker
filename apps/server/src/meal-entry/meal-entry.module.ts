import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MealEntryController } from './meal-entry.controller';
import { MealEntryService } from './meal-entry.service';

@Module({
  controllers: [MealEntryController],
  providers: [MealEntryService, PrismaService],
})
export class MealEntryModule {}
