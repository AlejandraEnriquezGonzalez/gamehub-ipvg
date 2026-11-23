
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum RolUsuario {
  ADMIN = 'admin',
  ESTUDIANTE = 'estudiante',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  alias: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.ESTUDIANTE,
  })
  rol: RolUsuario;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
