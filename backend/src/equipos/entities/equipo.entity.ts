
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Usuario } from '../../usuarios/entities/usuario.entity.js';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity.js';

export enum EstadoEquipo {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'capitanId' })
  capitan: Usuario;

  @Column({ type: 'varchar', length: 100 })
  juegoPreferido: string;

  @Column({
    type: 'enum',
    enum: EstadoEquipo,
    default: EstadoEquipo.ACTIVO,
  })
  estado: EstadoEquipo;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.equipo)
  inscripciones: Inscripcion[];
}
