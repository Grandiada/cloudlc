import { Test, TestingModule } from '@nestjs/testing';
import { CancellationServiceController } from './cancellation-service.controller';
import { CancellationServiceService } from './cancellation-service.service';

describe('CancellationServiceController', () => {
  let cancellationServiceController: CancellationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CancellationServiceController],
      providers: [CancellationServiceService],
    }).compile();

    cancellationServiceController = app.get<CancellationServiceController>(CancellationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cancellationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
