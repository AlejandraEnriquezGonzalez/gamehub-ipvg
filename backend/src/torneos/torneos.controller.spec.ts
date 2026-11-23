import { Test, TestingModule } from '@nestjs/testing';
import { TorneosController } from './torneos.controller.js';
import { TorneosService } from './torneos.service.js';

describe('TorneosController', () => {
  let controller: TorneosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TorneosController],
      providers: [{ provide: TorneosService, useValue: {} }],
    }).compile();

    controller = module.get<TorneosController>(TorneosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});