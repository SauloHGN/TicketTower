import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Mensagens } from './mensagens.entity';

@Entity()
export class Anexos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mensagens, (Mensagens) => Mensagens.id)
  @JoinColumn({ name: 'id_mensagem' })
  id_mensagem: Mensagens;

  @Column({ name: 'nome_arquivo', nullable: false })
  nome_arquivo: string;

  @Column({ name: 'tipo_arquivo', nullable: false })
  tipo_arquivo: string;

  @Column({ name: 'anexo', type: 'longblob', nullable: false })
  anexo: Buffer;
}
