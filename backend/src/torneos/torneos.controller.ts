import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTorneoDto } from './dto/create-torneo.dto.js';
import { FiltroTorneosDto } from './dto/filtro-torneos.dto.js';
import { UpdateTorneoDto } from './dto/update-torneo.dto.js';
import { TorneosService } from './torneos.service.js';

@ApiTags('Torneos')
@Controller('torneos')
export class TorneosController {
  constructor(private readonly torneosService: TorneosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear torneo (Administrador)' })
  @ApiResponse({ status: 201, description: 'Torneo creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() dto: CreateTorneoDto) {
    return this.torneosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar torneos con búsqueda y filtros' })
  findAll(@Query() filtros: FiltroTorneosDto) {
    return this.torneosService.findAll(filtros);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de un torneo' })
  @ApiResponse({ status: 404, description: 'Torneo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.torneosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar torneo (Administrador)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTorneoDto) {
    return this.torneosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar torneo (Administrador)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.torneosService.remove(id);
  }
}