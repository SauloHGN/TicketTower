import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionarios } from './entity/funcionarios.entity';
import { Setores } from './entity/setores.entity';
import { Repository } from 'typeorm';
import { padrao } from './enums/padrao';
import { Permissao } from './enums/permissao';
import * as crypto from 'crypto';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
    @InjectRepository(Setores)
    private readonly setoresRepository: Repository<Setores>,
  ) {}

  //Page 3000
  getHello(): string {
    return '<div style="display:flex; justify-content:center; align-items:center; font-size:25px; font-weight:600;">Hello World! 😎</div>';
  }

  async onApplicationBootstrap() {
    try {
      let setorPadrao = await this.setoresRepository.findOne({
        where: { nome: padrao.SETOR },
      });

      if (!setorPadrao) {
        setorPadrao = new Setores();
        setorPadrao.nome = padrao.SETOR;
        await this.setoresRepository.save(setorPadrao);
      }

      const funcionarioPadrao = await this.funcionariosRepository.findOne({
        where: { email: padrao.EMAIL },
      });

      if (funcionarioPadrao) {
        return;
      }

      const insertDefaultUser = new Funcionarios();
      insertDefaultUser.nome = padrao.USERNAME;
      insertDefaultUser.email = padrao.EMAIL;
      insertDefaultUser.senha = await this.GerarHash(padrao.SENHA);
      insertDefaultUser.cargo = padrao.CARGO;
      insertDefaultUser.permissao = Permissao.ADMIN;
      insertDefaultUser.id_setor = setorPadrao;

      this.funcionariosRepository.save(insertDefaultUser);
      return;
    } catch (error) {
      throw new Error('Erro ao cadastrar usuario padrão.');
    }
  }
  async GerarHash(senha: string): Promise<string> {
    const senhaHash = crypto.createHash('sha256');
    senhaHash.update(senha);
    return senhaHash.digest('hex');
  }
}
