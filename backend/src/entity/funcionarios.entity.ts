import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Setores } from './setores.entity';
import { Permissao } from 'src/enums/permissao';

@Entity()
export class Funcionarios {
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

  @Column({ name: 'cargo', nullable: false })
  cargo: string;

  @Column({ name: 'permissao', type: 'enum', enum: Permissao })
  permissao: Permissao;

  @ManyToOne(() => Setores, (Setores) => Setores.id)
  @JoinColumn({ name: 'id_setor' })
  id_setor: Setores;
}
