import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tickets } from './ticket.entity';
import { Anexos } from './anexos.entity';

@Entity()
export class Mensagens {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Tickets, (Tickets) => Tickets.id)
  @JoinColumn({ name: 'id_ticket' })
  id_ticket: Tickets;

  @Column({ name: 'mensagem' })
  mensagem: string;

  @Column({ name: 'data_hora', nullable: false })
  data_hora: Date;

  @ManyToOne(() => Anexos, (Anexos) => Anexos.id)
  @JoinColumn({ name: 'id_anexo' })
  id_anexo: Anexos;

  @Column({ name: 'id_remetente', nullable: false })
  id_remetente: number;
}
