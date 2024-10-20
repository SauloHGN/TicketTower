import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Sla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticket_tipo: string;

  @Column()
  prioridade: string;

  @Column()
  tempo_resposta: number; // em minutos

  @Column()
  tempo_resolucao: number; // em minutos

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
