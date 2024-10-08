import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { Funcionarios } from './funcionarios.entity';
import { Setores } from './setores.entity';
import { AbertoPorTipo } from 'src/enums/abertoPor';
import { StatusTicket } from 'src/enums/statusTicket';
import { Prioridade } from 'src/enums/prioridade';
import { ResponsavelDto } from 'src/dto/ResponsavelDto';

@Entity()
export class Tickets {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  data_hora_abertura: Date;

  @Column({ type: 'datetime' })
  data_hora_encerramento: Date;

  @Column()
  aberto_por: string;

  @Column({ type: 'enum', enum: AbertoPorTipo })
  aberto_por_tipo: AbertoPorTipo;

  @Column({ type: 'enum', enum: StatusTicket, default: StatusTicket.ABERTO })
  status: StatusTicket;

  @ManyToOne(() => Setores, (Setores) => Setores.id, { eager: true })
  @JoinColumn({ name: 'id_setor' })
  id_setor: Setores;

  @Column({ type: 'enum', enum: Prioridade })
  prioridade: Prioridade;

  @Column({ name: 'titulo' })
  titulo: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @ManyToOne(() => Funcionarios, (Funcionarios) => Funcionarios.id, {
    eager: true,
  })
  @JoinColumn({ name: 'id_responsavel' })
  id_responsavel: ResponsavelDto;
}
