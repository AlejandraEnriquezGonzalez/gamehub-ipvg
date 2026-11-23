import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Partido } from '../../partidos/entities/partido.entity.js';
import { Equipo } from '../../equipos/entities/equipo.entity.js';
import { Usuario } from '../../usuarios/entities/usuario.entity.js';

@Entity('resultados')
export class Resultado {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Partido, (partido) => partido.resultado)
  @JoinColumn({ name: 'partidoId' })
  partido: Relation<Partido>;

  @Column({ type: 'int' })
  puntajeLocal: number;

  @Column({ type: 'int' })
  puntajeVisitante: number;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'ganadorId' })
  ganador: Relation<Equipo> | null;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'registradoPor' })
  registradoPor: Relation<Usuario>;
}
