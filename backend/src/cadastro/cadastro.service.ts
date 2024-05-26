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
import { Permissao } from 'src/enums/permissao';

@Injectable()
export class CadastroService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
    @InjectRepository(Empresas)
    private readonly empresasRepository: Repository<Empresas>,
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

      clienteDto.senha = '123'; //senha default
      const senhaHash = await bcrypt.hash(clienteDto.senha, 10);

      const cliente = this.funcionariosRepository.create({
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

      funcionarioDto.senha = '123';
      const senhaHash = await bcrypt.hash(funcionarioDto.senha, 10);

      const funcionario = this.funcionariosRepository.create({
        ...funcionarioDto,
        senha: senhaHash,
      });
      return this.funcionariosRepository.save(funcionario);
    } catch (error) {
      throw new Error('Erro ao cadastrar funcionario');
    }
  }

  async cadastrarEmpresa(empresaDto: EmpresaDTO) {
    try {
      const empresa = this.empresasRepository.create(empresaDto);
      return this.empresasRepository.save(empresa);
    } catch (error) {
      throw new Error('Erro ao cadastrar empresa');
    }
  }

  async cadastrarSetor(setorDto: SetorDTO) {
    try {
      const setor = this.setoresRepository.create(setorDto);
      return this.setoresRepository.save(setor);
    } catch (error) {
      throw new Error('Erro ao cadastrar setor');
    }
  }
}
