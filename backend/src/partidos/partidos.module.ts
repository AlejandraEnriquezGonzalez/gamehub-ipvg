import { Module } from '@nestjs/common';
import { PartidosController } from './partidos.controller.js';
import { PartidosService } from './partidos.service.js';

@Module({
  controllers: [PartidosController],
  providers: [PartidosService]
})
export class PartidosModule {}
