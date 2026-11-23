import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoTorneo, ModalidadTorneo } from '../entities/torneo.entity.js';

export class FiltroTorneosDto {
  @ApiPropertyOptional({ description: 'Busca por nombre o videojuego' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Valorant' })
  @IsOptional()
  @IsString()
  videojuego?: string;

  @ApiPropertyOptional({ enum: EstadoTorneo })
  @IsOptional()
  @IsEnum(EstadoTorneo)
  estado?: EstadoTorneo;

  @ApiPropertyOptional({ enum: ModalidadTorneo })
  @IsOptional()
  @IsEnum(ModalidadTorneo)
  modalidad?: ModalidadTorneo;
}