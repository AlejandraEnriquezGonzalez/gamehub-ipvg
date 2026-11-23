
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Torneo } from '../../torneos/entities/torneo.entity.js';
import { Equipo } from '../../equipos/entities/equipo.entity.js';
import { Resultado } from '../../resultados/entities/resultado.entity.js';

export enum EstadoPartido {
  PROGRAMADO = 'programado',
  EN_CURSO = 'en_curso',
  FINALIZADO = 'finalizado',
  CANCELADO = 'cancelado',
}

@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Torneo, (torneo) => torneo.partidos)
  @JoinColumn({ name: 'torneoId' })
  torneo: Relation<Torneo>;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipoLocalId' })
  equipoLocal: Relation<Equipo>;

  @ManyToOne(() => Equipo)
  @JoinColumn({ name: 'equipoVisitanteId' })
  equipoVisitante: Relation<Equipo>;

  @Column({ type: 'datetime' })
  fechaHora: Date;

  @Column({ type: 'varchar', length: 100 })
  ronda: string;

  @Column({
    type: 'enum',
    enum: EstadoPartido,
    default: EstadoPartido.PROGRAMADO,
  })
  estado: EstadoPartido;

  @OneToOne(() => Resultado, (resultado) => resultado.partido)
  resultado: Relation<Resultado>;
}
