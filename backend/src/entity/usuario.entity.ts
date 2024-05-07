import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Funcionarios } from './funcionarios.entity';
import { Admin } from './admin.entity';
import { Clientes } from './clientes.entity';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Nome: string;

  @Column()
  Email: string;

  @Column()
  Telefone: string;

  @Column({
    type: 'enum',
    enum: ['Funcionario', 'Admin', 'Cliente'],
  })
  Tipo: 'Funcionario' | 'Admin' | 'Cliente';
}
