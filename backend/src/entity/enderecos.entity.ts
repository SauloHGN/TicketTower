import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Enderecos {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'numero', nullable: false })
  numero: string;

  @Column({ name: 'rua', nullable: false })
  rua: string;

  @Column({ name: 'bairro', nullable: false })
  bairro: string;

  @Column({ name: 'cidade', nullable: false })
  cidade: string;

  @Column({ name: 'estado', nullable: false })
  estado: string;

  @Column({ name: 'cep', nullable: false })
  cep: string;
}
