import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateInscripcionDto {
  @ApiProperty({ example: 1, description: 'ID del torneo' })
  @IsInt({ message: 'torneoId debe ser un número entero' })
  @IsPositive()
  torneoId: number;

  @ApiProperty({ example: 1, description: 'ID del equipo que se inscribe' })
  @IsInt({ message: 'equipoId debe ser un número entero' })
  @IsPositive()
  equipoId: number;
}