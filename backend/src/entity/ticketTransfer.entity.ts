import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tickets } from './ticket.entity';
import { Setores } from './setores.entity';

@Entity('ticket_transfer')
export class TicketTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => Tickets ) // Relacionamento com a entidade Ticket
  @JoinColumn({ name: 'ticket_id' }) // Nome da coluna que armazena o ID do ticket
  ticket: Tickets;

  @ManyToOne(() => Setores, (Setores) => Setores.id, { eager: true })
  @JoinColumn({ name: 'setor_anterior' })
  setorAnterior: Setores;

  @ManyToOne(() => Setores, (Setores) => Setores.id, { eager: true })
  @JoinColumn({ name: 'setor_novo' })
  setorNovo: Setores;

  @CreateDateColumn({ name: 'data_transferencia', type: 'datetime' })
  dataTransferencia: Date;
}
