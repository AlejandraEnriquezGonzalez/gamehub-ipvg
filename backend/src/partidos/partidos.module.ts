
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartidosController } from './partidos.controller.js';
import { PartidosService } from './partidos.service.js';
import { Partido } from './entities/partido.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Partido])],
  controllers: [PartidosController],
  providers: [PartidosService],
  exports: [TypeOrmModule],
})
export class PartidosModule {}
