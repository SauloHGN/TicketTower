import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(UsersView)
    private readonly usersView: Repository<UsersView>,
    @InjectRepository(Funcionarios)
    private readonly funcionarioRepositoty: Repository<Funcionarios>,
  ) {}

  async getSetorByID(id: string) {
    try {
      const funcionario = await this.funcionarioRepositoty.findOne({
        where: { id: id },
      });

      if (funcionario == null) {
        return {
          status: 404,
          mensagem: 'Usuário não encontrado',
          setor: null,
        };
      }

      return {
        status: 200,
        mensagem: 'Setor encontrado com sucesso',
        setor: funcionario.id_setor,
      };
    } catch (error) {
      console.error('Erro ao efetuar consulta:', error);
      return {
        status: 500,
        mensagem: 'Erro ao efetuar consulta: ' + error,
        setor: null,
      };
    }
  }

  async getPermissaoByID(id: string) {
    try {
      const usuario = await this.usersView.findOne({
        where: { id: id },
      });

      if (usuario == null) {
        return {
          status: 404,
          mensagem: 'Usuário não encontrado',
          permissao: null,
        };
      }

      return {
        status: 200,
        mensagem: 'Permissao encontrada com sucesso',
        permissao: usuario.permissao,
      };
    } catch (error) {
      console.error('Erro ao efetuar consulta:', error);
      return {
        status: 500,
        mensagem: 'Erro ao efetuar consulta: ' + error,
        permissao: null,
      };
    }
  }
}
