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

  async getIdByEmail(email: string): Promise<string | null> {
    const dados = await this.usersViewRepository.findOne({
      where: { email: email },
    });

    return dados ? dados.id : null;
  }

  async getRoleByID(id: string): Promise<string> | null {
    try {
      // Verificar na tabela funcionarios
      const funcionario = await this.funcionarioRepository.findOne({
        where: { id: id },
      });

      if (funcionario) {
        return 'funcionario';
      }

      // Verificar na tabela clientes
      const cliente = await this.clienteRepository.findOne({
        where: { id: id },
      });

      if (cliente) {
        return 'cliente';
      }

      // Se não encontrar em nenhum dos dois
      return null;
    } catch (error) {
      console.error('Erro ao buscar o registro:', error);
      throw new Error('Erro ao buscar o registro');
    }
  }

  async getTableById(id: string): Promise<string> {
    try {
      // Verificar na tabela funcionarios
      const funcionario = await this.funcionarioRepository.findOne({
        where: { id: id },
      });

      if (funcionario) {
        return 'funcionario';
      }

      // Verificar na tabela clientes
      const cliente = await this.clienteRepository.findOne({
        where: { id: id },
      });

      if (cliente) {
        return 'cliente';
      }

      // Se não encontrar em nenhum dos dois
      return 'não encontrado';
    } catch (error) {
      console.error('Erro ao buscar o registro:', error);
      throw new Error('Erro ao buscar o registro');
    }
  }
}
