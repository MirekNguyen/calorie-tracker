import { Test, TestingModule } from '@nestjs/testing';
import { MealEntryController } from './meal-entry.controller';

describe('MealEntryController', () => {
  let controller: MealEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealEntryController],
    }).compile();

    controller = module.get<MealEntryController>(MealEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
