import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Setores } from 'src/entity/setores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SetoresService {
  constructor(
    @InjectRepository(Setores)
    private readonly setorRepository: Repository<Setores>,

    @InjectRepository(Funcionarios)
    private readonly funcionarioRepository: Repository<Funcionarios>,
  ) {}

  async findAll(): Promise<Setores[]> {
    return await this.setorRepository.find();
  }

  async getSetorByID(setorID: number): Promise<Setores | null> {
    return await this.setorRepository.findOne({ where: { id: setorID } });
  }

   // Apenas para Funcionarios
   async getSetorUserByID(userID: string) {
    const user = await this.funcionarioRepository.findOne({
      where: { id: userID },
    });

    return user.id_setor;
  }

}
