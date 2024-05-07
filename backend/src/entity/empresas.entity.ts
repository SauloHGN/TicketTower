import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Enderecos } from './enderecos.entity';

@Entity()
export class Empresas {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Nome: string;

  @Column()
  CNPJ: string;

  @OneToOne(() => Enderecos, (endereco) => endereco.ID)
  @JoinColumn({ name: 'EnderecoID' })
  EnderecoID: Enderecos;
}
