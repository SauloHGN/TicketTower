import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuarios } from './usuario.entity';
import { Empresas } from './empresas.entity';

@Entity()
export class Clientes {
  @PrimaryGeneratedColumn()
  ID: number;

  @OneToOne(() => Usuarios)
  @JoinColumn({ name: 'usuarioID' })
  usuarioID: Usuarios;

  @OneToOne(() => Empresas)
  @JoinColumn({ name: 'IDEmpresa' })
  IDEmpresa: Empresas;
}
