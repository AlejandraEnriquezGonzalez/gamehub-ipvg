import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Torneo } from '../../torneos/entities/torneo.entity.js';
import { Equipo } from '../../equipos/entities/equipo.entity.js';

export enum EstadoInscripcion {
  PENDIENTE = 'pendiente',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada',
}

@Entity('inscripciones')
@Unique(['torneo', 'equipo'])
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Torneo, (torneo) => torneo.inscripciones)
@JoinColumn({ name: 'torneoId' })
torneo: Relation<Torneo>;

@ManyToOne(() => Equipo, (equipo) => equipo.inscripciones)
@JoinColumn({ name: 'equipoId' })
equipo: Relation<Equipo>;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: EstadoInscripcion,
    default: EstadoInscripcion.PENDIENTE,
  })
  estado: EstadoInscripcion;
}
