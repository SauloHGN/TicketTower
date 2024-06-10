import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//-----------------------------------------------
//DTOs são as especificações de tipos de dados
import { FuncionarioDTO } from '../dto/FuncionarioDto';
import { ClienteDTO } from '../dto/ClienteDto';
import { EmpresaDTO } from '../dto/EmpresaDto';
import { SetorDTO } from '../dto/SetorDto';
//------------------------------------------------
import { Clientes } from '../entity/clientes.entity';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Empresas } from '../entity/empresas.entity';
import { Setores } from '../entity/setores.entity';
//------------------------------------------------
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Permissao } from 'src/enums/permissao';
import { Enderecos } from 'src/entity/enderecos.entity';
import { EnderecoDto } from 'src/dto/EnderecoDto';
import { padrao } from 'src/enums/padrao';

@Injectable()
export class CadastroService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
    @InjectRepository(Empresas)
    private readonly empresasRepository: Repository<Empresas>,
    @InjectRepository(Enderecos)
    private readonly enderecosRepository: Repository<Enderecos>,
    @InjectRepository(Setores)
    private readonly setoresRepository: Repository<Setores>,
  ) {}

  async cadastrarCliente(funcionarioId: number, clienteDto: ClienteDTO) {
    try {
      const authAdmin = await this.funcionariosRepository.findOne({
        where: { id: funcionarioId },
      });

      if (!authAdmin || authAdmin.permissao !== Permissao.ADMIN) {
        throw new Error('Permissão negada'); // Se não for admin, terá permissao negada
      }

      clienteDto.senha = padrao.SENHA; //senha default
      const senhaHash = await this.GerarHash(clienteDto.senha);

      const cliente = this.clientesRepository.create({
        ...clienteDto,
        senha: senhaHash,
      });
      return this.clientesRepository.save(cliente);
    } catch (error) {
      throw new Error('Erro ao cadastrar cliente');
    }
  }

  async cadastrarFuncionario(
    funcionarioId: number,
    funcionarioDto: FuncionarioDTO,
  ) {
    try {
      const authAdmin = await this.funcionariosRepository.findOne({
        where: { id: funcionarioId },
      });

      if (!authAdmin || authAdmin.permissao !== Permissao.ADMIN) {
        throw new Error('Permissão negada'); // Se não for admin, terá permissao negada
      }

      funcionarioDto.senha = padrao.SENHA;
      const senhaHash = await this.GerarHash(funcionarioDto.senha);

      const funcionario = this.funcionariosRepository.create({
        ...funcionarioDto,
        senha: senhaHash,
      });
      return this.funcionariosRepository.save(funcionario);
    } catch (error) {
      throw new Error('Erro ao cadastrar funcionario');
    }
  }

  async cadastrarEndereco(enderecoDto: EnderecoDto) {
    try {
      const endereco = this.enderecosRepository.create(enderecoDto);
      return this.enderecosRepository.save(endereco);
    } catch (error) {
      throw new Error('Erro ao cadastrar endereco');
    }
  }

  async cadastrarEmpresa(empresaDto: EmpresaDTO) {
    try {
      const empresaExistente = await this.empresasRepository.findOne({
        where: { cnpj: empresaDto.cnpj, nome: empresaDto.nome },
      });
      if (empresaExistente) {
        throw new Error('Já existe uma empresa com este nome ou cnpj');
      }

      const empresa = this.empresasRepository.create(empresaDto);
      return this.empresasRepository.save(empresa);
    } catch (error) {
      throw new Error('Erro ao cadastrar empresa');
    }
  }

  async cadastrarSetor(setorDto: SetorDTO) {
    try {
      const setorExistente = await this.setoresRepository.findOne({
        where: { nome: setorDto.nome },
      });
      if (setorExistente) {
        throw new Error('Já existe um setor com este nome');
      }

      const setor = this.setoresRepository.create(setorDto);
      return this.setoresRepository.save(setor);
    } catch (error) {
      throw new Error('Erro ao cadastrar setor');
    }
  }

  async GerarHash(senha: string): Promise<string> {
    const senhaHash = crypto.createHash('sha256');
    senhaHash.update(senha);
    return senhaHash.digest('hex');
  }
}
