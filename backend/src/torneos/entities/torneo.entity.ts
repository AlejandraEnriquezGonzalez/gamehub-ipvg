
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity.js';
import { Partido } from '../../partidos/entities/partido.entity.js';

export enum ModalidadTorneo {
  ELIMINACION_DIRECTA = 'eliminacion_directa',
  LIGA = 'liga',
}

export enum EstadoTorneo {
  PROXIMO = 'proximo',
  EN_CURSO = 'en_curso',
  FINALIZADO = 'finalizado',
  CANCELADO = 'cancelado',
}

@Entity('torneos')
export class Torneo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  videojuego: string;

  @Column({
    type: 'enum',
    enum: ModalidadTorneo,
  })
  modalidad: ModalidadTorneo;

  @Column({ type: 'datetime' })
  fechaInicio: Date;

  @Column({ type: 'datetime' })
  cierreInscripcion: Date;

  @Column({ type: 'int' })
  cupoMaximo: number;

  @Column({
    type: 'enum',
    enum: EstadoTorneo,
    default: EstadoTorneo.PROXIMO,
  })
  estado: EstadoTorneo;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.torneo)
  inscripciones: Inscripcion[];

  @OneToMany(() => Partido, (partido) => partido.torneo)
  partidos: Partido[];
}
