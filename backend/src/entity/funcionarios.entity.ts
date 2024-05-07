import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Usuarios } from './usuario.entity';
import { Setores } from './setores.entity';

@Entity()
export class Funcionarios {
  @PrimaryGeneratedColumn()
  ID: number;

  @OneToOne(() => Usuarios)
  @JoinColumn({ name: 'UsuarioID' })
  UsuarioID: Usuarios;

  @Column()
  Cargo: string;

  @ManyToOne(() => Setores)
  @JoinColumn({ name: 'SetorID' })
  SetorID: Setores;
}
