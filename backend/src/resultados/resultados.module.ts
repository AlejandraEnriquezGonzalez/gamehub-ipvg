
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultadosController } from './resultados.controller.js';
import { ResultadosService } from './resultados.service.js';
import { Resultado } from './entities/resultado.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Resultado])],
  controllers: [ResultadosController],
  providers: [ResultadosService],
  exports: [TypeOrmModule],
})
export class ResultadosModule {}
