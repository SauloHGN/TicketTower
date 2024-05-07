import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class EquipamentosServidores {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Nome: string;

  @Column()
  Descricao: string;

  @Column({
    type: 'enum',
    enum: ['ativo', 'inativo', 'manutencao'],
  })
  Estado: 'ativo' | 'inativo' | 'manutencao';
}
