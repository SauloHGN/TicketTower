import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from 'src/entity/clientes.entity';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
  ) {}
}
