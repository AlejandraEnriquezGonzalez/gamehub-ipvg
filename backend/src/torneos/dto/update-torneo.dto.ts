import { PartialType } from '@nestjs/swagger';
import { CreateTorneoDto } from './create-torneo.dto.js';

// Todos los campos de CreateTorneoDto pasan a ser opcionales
export class UpdateTorneoDto extends PartialType(CreateTorneoDto) {}