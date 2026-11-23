import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Torneo } from './entities/torneo.entity.js';
import { TorneosService } from './torneos.service.js';

describe('TorneosService', () => {
  let service: TorneosService;
  const repoMock = {
    findOneBy: vi.fn(),
    create: vi.fn((dto) => dto),
    save: vi.fn(async (t) => ({ id: 1, ...t })),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TorneosService,
        { provide: getRepositoryToken(Torneo), useValue: repoMock },
      ],
    }).compile();

    service = module.get<TorneosService>(TorneosService);
  });

  it('lanza NotFoundException si el torneo no existe', async () => {
    repoMock.findOneBy.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('rechaza un torneo cuyo cierre es posterior al inicio', async () => {
    await expect(
      service.create({
        nombre: 'Copa',
        videojuego: 'FIFA',
        modalidad: 'liga' as any,
        fechaInicio: '2026-12-01',
        cierreInscripcion: '2026-12-10T00:00:00',
        cupoMaximo: 8,
      }),
    ).rejects.toThrow('El cierre de inscripción debe ser anterior');
  });
});