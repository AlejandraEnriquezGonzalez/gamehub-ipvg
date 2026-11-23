import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Equipo, EstadoEquipo } from '../equipos/entities/equipo.entity.js';
import { EstadoTorneo, Torneo } from '../torneos/entities/torneo.entity.js';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto.js';
import { FiltroInscripcionesDto } from './dto/filtro-inscripciones.dto.js';
import {
  EstadoInscripcion,
  Inscripcion,
} from './entities/inscripcion.entity.js';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionesRepository: Repository<Inscripcion>,
    @InjectRepository(Torneo)
    private readonly torneosRepository: Repository<Torneo>,
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
  ) {}

  async create(dto: CreateInscripcionDto): Promise<Inscripcion> {
    const torneo = await this.torneosRepository.findOneBy({ id: dto.torneoId });
    if (!torneo) {
      throw new NotFoundException(`El torneo con id ${dto.torneoId} no existe`);
    }

    const equipo = await this.equiposRepository.findOneBy({ id: dto.equipoId });
    if (!equipo) {
      throw new NotFoundException(`El equipo con id ${dto.equipoId} no existe`);
    }
    if (equipo.estado === EstadoEquipo.INACTIVO) {
      throw new BadRequestException('Un equipo inactivo no puede inscribirse');
    }

    // Regla: período de inscripción cerrado o torneo no disponible
    if (torneo.estado !== EstadoTorneo.PROXIMO) {
      throw new BadRequestException(
        `El torneo está ${torneo.estado} y no acepta inscripciones`,
      );
    }
    if (new Date() > new Date(torneo.cierreInscripcion)) {
      throw new BadRequestException(
        'El período de inscripción de este torneo ya está cerrado',
      );
    }

    // Regla: un equipo no puede inscribirse dos veces en el mismo torneo
    const existente = await this.inscripcionesRepository.findOne({
      where: { torneo: { id: torneo.id }, equipo: { id: equipo.id } },
    });
    if (existente) {
      throw new ConflictException(
        'Este equipo ya está inscrito en el torneo',
      );
    }

    // Regla: no superar el cupo máximo (cuentan pendientes y aceptadas)
    const ocupados = await this.inscripcionesRepository.count({
      where: {
        torneo: { id: torneo.id },
        estado: In([EstadoInscripcion.PENDIENTE, EstadoInscripcion.ACEPTADA]),
      },
    });
    if (ocupados >= torneo.cupoMaximo) {
      throw new BadRequestException(
        `El torneo alcanzó su cupo máximo de ${torneo.cupoMaximo} equipos`,
      );
    }

    const inscripcion = this.inscripcionesRepository.create({ torneo, equipo });
    return this.inscripcionesRepository.save(inscripcion);
  }

  findAll(filtros: FiltroInscripcionesDto): Promise<Inscripcion[]> {
    return this.inscripcionesRepository.find({
      where: {
        ...(filtros.torneoId && { torneo: { id: filtros.torneoId } }),
        ...(filtros.equipoId && { equipo: { id: filtros.equipoId } }),
        ...(filtros.estado && { estado: filtros.estado }),
      },
      relations: { torneo: true, equipo: true },
      order: { fecha: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionesRepository.findOne({
      where: { id },
      relations: { torneo: true, equipo: true },
    });
    if (!inscripcion) {
      throw new NotFoundException(`La inscripción con id ${id} no existe`);
    }
    return inscripcion;
  }

  // El administrador acepta o rechaza la inscripción
  async cambiarEstado(
    id: number,
    estado: EstadoInscripcion,
  ): Promise<Inscripcion> {
    const inscripcion = await this.findOne(id);
    inscripcion.estado = estado;
    return this.inscripcionesRepository.save(inscripcion);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const inscripcion = await this.findOne(id);
    await this.inscripcionesRepository.remove(inscripcion);
    return { mensaje: `Inscripción ${id} eliminada correctamente` };
  }
}