import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tickets } from './ticket.entity';
import { Funcionarios } from './funcionarios.entity';

@Entity()
export class registrotarefas {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => Tickets)
  @JoinColumn({ name: 'IDTicket' })
  IDTicket: Tickets;

  @ManyToOne(() => Funcionarios)
  @JoinColumn({ name: 'IDFuncionario' })
  IDFuncionario: Funcionarios;

  @Column('text')
  mensagem: string;
}
