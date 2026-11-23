import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EstadoTorneo, ModalidadTorneo } from '../entities/torneo.entity.js';

export class CreateTorneoDto {
  @ApiProperty({ example: 'Copa IPVG Valorant 2026' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Valorant' })
  @IsString()
  @IsNotEmpty({ message: 'El videojuego es obligatorio' })
  @MaxLength(80)
  videojuego: string;

    @ApiProperty({ enum: ModalidadTorneo, example: ModalidadTorneo.LIGA })
  @IsEnum(ModalidadTorneo, { message: 'Modalidad debe ser eliminacion_directa o liga' })
  modalidad: ModalidadTorneo;

  @ApiProperty({ example: '2026-12-10T10:00:00' })
  @IsDateString({}, { message: 'fechaInicio debe ser una fecha válida' })
  fechaInicio: string;

  @ApiProperty({ example: '2026-12-05T23:59:00' })
  @IsDateString({}, { message: 'cierreInscripcion debe ser una fecha válida' })
  cierreInscripcion: string;

  @ApiProperty({ example: 8 })
  @IsInt({ message: 'cupoMaximo debe ser un número entero' })
  @Min(2, { message: 'El cupo mínimo es de 2 equipos' })
  cupoMaximo: number;

  @ApiProperty({ enum: EstadoTorneo, required: false })
  @IsOptional()
  @IsEnum(EstadoTorneo)
  estado?: EstadoTorneo;
}