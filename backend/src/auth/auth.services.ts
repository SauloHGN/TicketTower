import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Clientes } from '../entity/clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
  ) {}

  async login(email: string, senha: string) {
    try {
      const user = await this.verificarLogin(email, senha);

      if (user == null) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const accessToken = this.jwtService.sign({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user instanceof Funcionarios ? 'funcionario' : 'cliente',
        permissao: user instanceof Funcionarios ? user.permissao : null,
      });

      return { accessToken };
    } catch (error) {
      throw error;
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
}
