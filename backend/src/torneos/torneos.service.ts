import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTorneoDto } from './dto/create-torneo.dto.js';
import { FiltroTorneosDto } from './dto/filtro-torneos.dto.js';
import { UpdateTorneoDto } from './dto/update-torneo.dto.js';
import { Torneo } from './entities/torneo.entity.js';

@Injectable()
export class TorneosService {
  constructor(
    @InjectRepository(Torneo)
    private readonly torneosRepository: Repository<Torneo>,
  ) {}

    async create(dto: CreateTorneoDto): Promise<Torneo> {
    this.validarFechas(dto.fechaInicio, dto.cierreInscripcion);
    const torneo = this.torneosRepository.create({
      ...dto,
      fechaInicio: new Date(dto.fechaInicio),
      cierreInscripcion: new Date(dto.cierreInscripcion),
    });
    return this.torneosRepository.save(torneo);
  }
  // Búsqueda por texto + filtros combinables (videojuego, estado, modalidad)
  findAll(filtros: FiltroTorneosDto): Promise<Torneo[]> {
    const query = this.torneosRepository.createQueryBuilder('torneo');

    if (filtros.search) {
      query.andWhere(
        '(torneo.nombre LIKE :search OR torneo.videojuego LIKE :search)',
        { search: `%${filtros.search}%` },
      );
    }
    if (filtros.videojuego) {
      query.andWhere('torneo.videojuego = :videojuego', {
        videojuego: filtros.videojuego,
      });
    }
    if (filtros.estado) {
      query.andWhere('torneo.estado = :estado', { estado: filtros.estado });
    }
    if (filtros.modalidad) {
      query.andWhere('torneo.modalidad = :modalidad', {
        modalidad: filtros.modalidad,
      });
    }

    return query.orderBy('torneo.fechaInicio', 'ASC').getMany();
  }

  async findOne(id: number): Promise<Torneo> {
    const torneo = await this.torneosRepository.findOneBy({ id });
    if (!torneo) {
      throw new NotFoundException(`El torneo con id ${id} no existe`);
    }
    return torneo;
  }

    async update(id: number, dto: UpdateTorneoDto): Promise<Torneo> {
    const torneo = await this.findOne(id);
    const { fechaInicio, cierreInscripcion, ...resto } = dto;
    Object.assign(torneo, resto);
    if (fechaInicio) torneo.fechaInicio = new Date(fechaInicio);
    if (cierreInscripcion) torneo.cierreInscripcion = new Date(cierreInscripcion);
    this.validarFechas(torneo.fechaInicio, torneo.cierreInscripcion);
    return this.torneosRepository.save(torneo);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const torneo = await this.findOne(id);
    await this.torneosRepository.remove(torneo);
    return { mensaje: `Torneo ${id} eliminado correctamente` };
  }

  // Regla: el cierre de inscripciones no puede ser posterior al inicio del torneo
  private validarFechas(fechaInicio: string | Date, cierre: string | Date) {
    if (new Date(cierre) > new Date(fechaInicio)) {
      throw new BadRequestException(
        'El cierre de inscripción debe ser anterior a la fecha de inicio',
      );
    }
  }
}