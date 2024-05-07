import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Usuarios } from './usuario.entity';
import { Setores } from './setores.entity';

@Entity()
export class Admin {
  // @PrimaryGeneratedColumn()
  // ID: number;

  @OneToOne(() => Usuarios)
  @JoinColumn({ name: 'UsuarioID' })
  UsuarioID: Usuarios;

  @ManyToOne(() => Setores)
  @JoinColumn({ name: 'SetorID' })
  SetorID: Setores;
}
