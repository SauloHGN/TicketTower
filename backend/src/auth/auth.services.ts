import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Clientes } from '../entity/clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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
    const user = await this.verificarLogin(email, senha);
    if (user == null) {
      return { message: 'Credenciais inválidas' };
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo: user instanceof Funcionarios ? 'funcionario' : 'cliente',
    });

    return { accessToken };
  }

  async verificarLogin(
    email: string,
    senha: string,
  ): Promise<Funcionarios | Clientes | null> {
    const funcionario = await this.funcionariosRepository.findOne({
      where: { email },
    });
    if (funcionario && bcrypt.compareSync(senha, funcionario.senha)) {
      return funcionario;
    }

    const cliente = await this.clientesRepository.findOne({ where: { email } });
    if (cliente && bcrypt.compareSync(senha, cliente.senha)) {
      return cliente;
    }

    return null;
  }
}
