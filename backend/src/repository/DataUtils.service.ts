// inner-join.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientes } from '../entity/clientes.entity';
import { Funcionarios } from '../entity/funcionarios.entity';
import { UsersView } from 'src/entity/usersView.entity';

@Injectable()
export class DataUtilsService {
  constructor(
    @InjectRepository(Clientes)
    private clienteRepository: Repository<Clientes>,
    @InjectRepository(Funcionarios)
    private funcionarioRepository: Repository<Funcionarios>,
    @InjectRepository(UsersView)
    private usersViewRepository: Repository<UsersView>,
  ) {}

  async getIdByEmail(email: string): Promise<number | null> {
    const dados = await this.usersViewRepository.findOne({
      where: { email: email },
    });

    return dados ? dados.id : null;
  }
}
