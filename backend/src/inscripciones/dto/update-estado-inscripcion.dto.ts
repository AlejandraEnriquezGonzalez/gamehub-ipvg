import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstadoInscripcion } from '../entities/inscripcion.entity.js';

export class UpdateEstadoInscripcionDto {
  @ApiProperty({ enum: EstadoInscripcion, example: EstadoInscripcion.ACEPTADA })
  @IsEnum(EstadoInscripcion, {
    message: 'Estado debe ser pendiente, aceptada o rechazada',
  })
  estado: EstadoInscripcion;
}