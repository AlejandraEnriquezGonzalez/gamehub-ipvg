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
import { CreateInscripcionDto } from './dto/create-inscripcion.dto.js';
import { FiltroInscripcionesDto } from './dto/filtro-inscripciones.dto.js';
import { UpdateEstadoInscripcionDto } from './dto/update-estado-inscripcion.dto.js';
import { InscripcionesService } from './inscripciones.service.js';

@ApiTags('Inscripciones')
@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
  @ApiOperation({ summary: 'Inscribir un equipo en un torneo' })
  @ApiResponse({ status: 201, description: 'Inscripción creada (pendiente)' })
  @ApiResponse({ status: 400, description: 'Cupo lleno o inscripción cerrada' })
  @ApiResponse({ status: 404, description: 'Torneo o equipo no existe' })
  @ApiResponse({ status: 409, description: 'El equipo ya está inscrito' })
  create(@Body() dto: CreateInscripcionDto) {
    return this.inscripcionesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inscripciones (filtrar por torneo, equipo o estado)' })
  findAll(@Query() filtros: FiltroInscripcionesDto) {
    return this.inscripcionesService.findAll(filtros);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de una inscripción' })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Aceptar o rechazar inscripción (Administrador)' })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstadoInscripcionDto,
  ) {
    return this.inscripcionesService.cambiarEstado(id, dto.estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar inscripción (Administrador)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}