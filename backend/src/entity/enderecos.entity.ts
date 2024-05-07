import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Enderecos {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Rua: string;

  @Column()
  Cidade: string;

  @Column()
  Estado: string;

  @Column()
  CEP: string;
}
