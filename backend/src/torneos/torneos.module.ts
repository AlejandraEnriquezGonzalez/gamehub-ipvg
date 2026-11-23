import { Module } from '@nestjs/common';
import { TorneosController } from './torneos.controller.js';
import { TorneosService } from './torneos.service.js';

@Module({
  controllers: [TorneosController],
  providers: [TorneosService]
})
export class TorneosModule {}
