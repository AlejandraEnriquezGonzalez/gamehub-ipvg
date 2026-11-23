import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller.js';
import { InscripcionesService } from './inscripciones.service.js';

@Module({
  controllers: [InscripcionesController],
  providers: [InscripcionesService]
})
export class InscripcionesModule {}
