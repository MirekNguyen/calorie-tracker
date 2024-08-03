import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealModule } from './meal/meal.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MealEntryModule } from './meal-entry/meal-entry.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [MealModule, PrismaModule, MealEntryModule, AuthModule],
})
export class AppModule { }
