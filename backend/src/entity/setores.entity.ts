import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Setores {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  NomeSetor: string;
}
