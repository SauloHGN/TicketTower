import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Clientes } from '../entity/clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { padrao } from 'src/enums/padrao';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
        permissao: user instanceof Funcionarios ? user.permissao : 'cliente',
        defaultPass: user.senha == padrao.SENHA ? true : false,
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

  async salvarCodigo(id: number, codigo: string): Promise<boolean> {
    const key = `codigo_usuario:${id}`;
    await this.cacheManager.set(key, codigo, 1200); // Guarda o codigo no cache por 20 minutos~
    console.log(`Código salvo para ${key}: ${codigo}`);
    return true;
  }

  async verificarCodigo(id: number, codigo: string): Promise<boolean> {
    const key = `codigo_usuario:${id}`;
    const storedCode = await this.cacheManager.get<string>(key);
    return storedCode === codigo;
  }
}
