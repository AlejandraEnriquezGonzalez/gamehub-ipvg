
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscripcionesController } from './inscripciones.controller.js';
import { InscripcionesService } from './inscripciones.service.js';
import { Inscripcion } from './entities/inscripcion.entity.js';
import { Torneo } from '../torneos/entities/torneo.entity.js';
import { Equipo } from '../equipos/entities/equipo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Torneo, Equipo])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [TypeOrmModule, InscripcionesService],
})
export class InscripcionesModule {}
