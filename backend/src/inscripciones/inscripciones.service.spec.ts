import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Equipo } from '../equipos/entities/equipo.entity.js';
import { Torneo } from '../torneos/entities/torneo.entity.js';
import { Inscripcion } from './entities/inscripcion.entity.js';
import { InscripcionesService } from './inscripciones.service.js';

describe('InscripcionesService - reglas de negocio', () => {
  let service: InscripcionesService;

  const inscripcionesRepo = {
    findOne: vi.fn(),
    count: vi.fn(),
    create: vi.fn((data) => data),
    save: vi.fn(async (data) => ({ id: 1, ...data })),
  };
  const torneosRepo = { findOneBy: vi.fn() };
  const equiposRepo = { findOneBy: vi.fn() };

  const manana = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const ayer = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const torneoAbierto = {
    id: 1,
    estado: 'proximo',
    cierreInscripcion: manana,
    cupoMaximo: 2,
  };
  const equipo = { id: 5, estado: 'activo' };
  const dto = { torneoId: 1, equipoId: 5 };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InscripcionesService,
        { provide: getRepositoryToken(Inscripcion), useValue: inscripcionesRepo },
        { provide: getRepositoryToken(Torneo), useValue: torneosRepo },
        { provide: getRepositoryToken(Equipo), useValue: equiposRepo },
      ],
    }).compile();
    service = module.get<InscripcionesService>(InscripcionesService);
    equiposRepo.findOneBy.mockResolvedValue(equipo);
  });

  it('inscribe un equipo cuando cumple todas las reglas', async () => {
    torneosRepo.findOneBy.mockResolvedValue(torneoAbierto);
    inscripcionesRepo.findOne.mockResolvedValue(null);
    inscripcionesRepo.count.mockResolvedValue(0);

    const resultado = await service.create(dto);
    expect(resultado.id).toBe(1);
    expect(inscripcionesRepo.save).toHaveBeenCalled();
  });

  it('rechaza inscripción duplicada con ConflictException', async () => {
    torneosRepo.findOneBy.mockResolvedValue(torneoAbierto);
    inscripcionesRepo.findOne.mockResolvedValue({ id: 99 });

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
  });

  it('rechaza inscripción cuando el cupo está lleno', async () => {
    torneosRepo.findOneBy.mockResolvedValue(torneoAbierto);
    inscripcionesRepo.findOne.mockResolvedValue(null);
    inscripcionesRepo.count.mockResolvedValue(2); // cupoMaximo = 2

    await expect(service.create(dto)).rejects.toThrow('cupo máximo');
  });

  it('rechaza inscripción si el período ya cerró', async () => {
    torneosRepo.findOneBy.mockResolvedValue({
      ...torneoAbierto,
      cierreInscripcion: ayer,
    });

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });
});