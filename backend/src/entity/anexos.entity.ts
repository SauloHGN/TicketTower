import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { registrotarefas } from './registrotarefas.entity';

@Entity()
export class Anexos {
  @PrimaryGeneratedColumn()
  ID: number;

  @ManyToOne(() => registrotarefas, (RegistroTarefa) => RegistroTarefa.ID)
  @JoinColumn({ name: 'IDRespostaTicket' })
  IDRespostaTicket: registrotarefas;

  @Column()
  NomeArquivo: string;

  @Column()
  TipoArquivo: string;

  @Column({ type: 'longblob' })
  dadosArquivo: Buffer;
}
