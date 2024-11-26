import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Clientes } from '../entity/clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { padrao } from 'src/enums/padrao';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { UsersView } from 'src/entity/usersView.entity';
import { Permissao } from 'src/enums/permissao';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly dataUtilsService: DataUtilsService,

    @InjectRepository(UsersView)
    private readonly usersView: Repository<UsersView>,
  ) {}

  async login(email: string, senha: string) {
    try {
      const user = await this.verificarLogin(email, senha);

      if (user == null) {
        return('Credenciais inválidas');
      }

      const accessToken = this.jwtService.sign({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user instanceof Funcionarios ? 'funcionario' : 'cliente',
        permissao: user instanceof Funcionarios ? user.permissao : 'cliente',
        defaultPass: user.senha == padrao.SENHA ? true : false,
      });

      return { accessToken };
    } catch (error) {
      return error;
    }
  }

  async verificarLogin(
    email: string,
    senha: string,
  ): Promise<Funcionarios | Clientes | null> {
    const senhaHash = await this.GerarHash(senha);

    const funcionario = await this.funcionariosRepository.findOne({
      where: { email },
    });
    if (funcionario && senhaHash == funcionario.senha) {
      return funcionario;
    }

    const cliente = await this.clientesRepository.findOne({ where: { email } });
    if (cliente && senhaHash == cliente.senha) {
      return cliente;
    }

    return null;
  }

  async GerarHash(senha: string): Promise<string> {
    const senhaHash = crypto.createHash('sha256');
    senhaHash.update(senha);
    return senhaHash.digest('hex');
  }

  //--------------------------------------------------
  //  Sessão codigo

  gerarCodigo(lenght: number) {
    let code = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*';
    for (let i = 0; i < lenght; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  }

  async salvarCodigo(id: string, codigo: string): Promise<boolean> {
    try {
      await this.cacheManager.set(id, codigo, 0); // Guarda o codigo no cache (0 = não expira)
      console.log(`Código salvo para ${id}: ${codigo}`);

      return true;
    } catch (error) {
      console.error(`Erro ao salvar o código para ${id}:`, error);
      return false;
    }
  }

  async verificarCodigo(id: string, codigo: string): Promise<boolean> {
    try {
      const storedCode = await this.cacheManager.get<string>(id);

      return storedCode == codigo;
    } catch (error) {
      console.error(`Erro ao verificar o código para ${id}:`, error);
      return false;
    }
  }

  async redefinirSenha(email: string, codigo: string, senha: string) {
    const id = await this.dataUtilsService.getIdByEmail(email);
    await this.cacheManager.del(id); // remove o codigo do cache
    const tabela = await this.dataUtilsService.getTableById(id);

    try {
      // Hash da nova senha antes de armazenar
      const hashedPassword = await this.GerarHash(senha);

      if (tabela === 'funcionario') {
        const funcionario = await this.funcionariosRepository.findOne({
          where: { id: id },
        });

        if (!funcionario) {
          return 'Funcionário não encontrado';
        }

        funcionario.senha = hashedPassword; // Atualize o campo da senha
        await this.funcionariosRepository.save(funcionario);
        return 'Senha atualizada com sucesso';
      }

      if (tabela === 'cliente') {
        const cliente = await this.clientesRepository.findOne({
          where: { id: id },
        });

        if (!cliente) {
          return 'Cliente não encontrado';
        }

        cliente.senha = hashedPassword; // Atualize o campo da senha
        await this.clientesRepository.save(cliente);
        return 'Senha atualizada com sucesso';
      }

      return 'Tipo de tabela inválido';
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      return 'Erro ao atualizar a senha';
    }
  }


}
