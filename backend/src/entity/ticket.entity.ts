import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuarios } from './usuario.entity';
import { EquipamentosServidores } from './equipamentosservidores.entity';
import { registrotarefas } from './registrotarefas.entity';
import { Setores } from './setores.entity';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'datetime' })
  DataAbertura: Date;

  @Column({ type: 'datetime' })
  DataEncerramento: Date;

  @Column()
  Prioridade: number;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'AbertoPor' })
  AbertoPor: Usuarios;

  @ManyToOne(() => Setores, (Setores) => Setores.ID)
  @JoinColumn({ name: 'Responsavel' })
  Responsavel: Setores;

  @ManyToOne(() => EquipamentosServidores)
  @JoinColumn({ name: 'IdEquipamento' })
  IdEquipamento: EquipamentosServidores;

  @Column()
  Descricao: string;

  @OneToMany(() => registrotarefas, (RegistroTarefa) => RegistroTarefa.ID)
  @JoinColumn({ name: 'RegistroTarefas' })
  RegistroTarefas: registrotarefas;
}
