import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Empresas } from './empresas.entity';

@Entity()
export class Clientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'senha', nullable: false })
  senha: string;

  @Column({ name: 'celular', nullable: false })
  celular: string;

  @OneToOne(() => Empresas)
  @JoinColumn({ name: 'id_empresa' })
  id_empresa: Empresas;
}
