// inner-join.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
      return('Erro ao buscar o registro');
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
      return('Erro ao buscar o registro');
    }
  }

  async getEmailByID(id: string): Promise<string> | null {
    try {
      const user = await this.usersViewRepository.findOne({
        where: { id: id },
      });

      if (user) {
        return user.email;
      }

      return null;
    } catch (error) {
      return('Erro ao buscar o registro');
    }
  }

  getUserByID(id: string) {
    const user = this.usersViewRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async getAllUsersWithoutRoot() {
    return await this.usersViewRepository.find({
      where: { source: Not('root') },
    });
  }

  async deleteUserByID(id: string) {
    const role = await this.getRoleByID(id);

    if (role === 'cliente') {
      const cliente = await this.clienteRepository.findOne({ where: { id } });
      if (!cliente) {
        return { status: 404, msg: 'Cliente não encontrado' };
      }
      // Exclui o cliente
      await this.clienteRepository.remove(cliente);
      return { status: 200, msg: 'Cliente excluido com sucesso' };
    }
    // Verifica se o usuário é um funcionário
    else if (role === 'funcionario') {
      const funcionario = await this.funcionarioRepository.findOne({
        where: { id },
      });
      if (!funcionario) {
        return { status: 404, msg: 'Funcionário não encontrado' };
      }
      // Exclui o funcionário
      await this.funcionarioRepository.remove(funcionario);
      return { status: 200, msg: 'Funcionário excluido com sucesso' };
    } else {
      return { status: 500, msg: 'Usuário inválido' };
    }
  }

  async updateUserByID(id: string, alterData: any) {
    const role = await this.getRoleByID(id);

    if (role === 'cliente') {
      // Atualiza os dados do cliente
      const cliente = await this.clienteRepository.findOne({
        where: { id: id },
      });
      if (!cliente) {
        return { status: 404, msg: 'Cliente não encontrado' };
      }

      // Atualiza os campos permitidos para clientes
      const updatedCliente = this.clienteRepository.merge(cliente, alterData);
      await this.clienteRepository.save(updatedCliente);
      return { status: 200, msg: 'Usuário Atualizado' };
    } else {
      // Atualiza os dados do funcionário
      const funcionario = await this.funcionarioRepository.findOne({
        where: { id: id },
      });
      if (!funcionario) {
        return { status: 404, msg: 'Funcionário não encontrado' };
      }

      // Atualiza os campos permitidos para funcionários
      console.log(alterData);
      const updatedFuncionario = this.funcionarioRepository.merge(
        funcionario,
        alterData,
      );
      await this.funcionarioRepository.save(updatedFuncionario);
      return { status: 200, msg: 'Usuário Atualizado' };
    }
  }
}
