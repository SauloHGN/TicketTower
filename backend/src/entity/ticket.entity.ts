import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Funcionarios } from './funcionarios.entity';
import { Setores } from './setores.entity';
import { AbertoPorTipo } from 'src/enums/abertoPor';
import { StatusTicket } from 'src/enums/statusTicket';
import { Prioridade } from 'src/enums/prioridade';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'datetime' })
  data_hora_abertura: Date;

  @Column({ type: 'datetime' })
  data_hora_encerramento: Date;

  @Column()
  aberto_por: number;

  @Column({ type: 'enum', enum: AbertoPorTipo })
  aberto_por_tipo: AbertoPorTipo;

  @Column({ type: 'enum', enum: StatusTicket, default: StatusTicket.ABERTO })
  status: StatusTicket;

  @ManyToOne(() => Setores, (Setores) => Setores.id)
  @JoinColumn({ name: 'id_setor' })
  id_setor: Setores;

  @Column({ type: 'enum', enum: Prioridade })
  prioridade: Prioridade;

  @Column({ name: 'descricao' })
  descricao: string;

  @ManyToOne(() => Funcionarios, (Funcionarios) => Funcionarios.id)
  @JoinColumn({ name: 'id_funcionario' })
  id_funcionario: Funcionarios;
}
