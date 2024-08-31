import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Enderecos } from './enderecos.entity';

@Entity()
export class Empresas {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'cnpj', nullable: false })
  cnpj: string;

  @ManyToOne(() => Enderecos, (Enderecos) => Enderecos.id)
  @JoinColumn({ name: 'id_endereco' })
  id_endereco: Enderecos;
}
