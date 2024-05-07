import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//-----------------------------------------------
//DTOs são as especificações de tipos de dados
import { AdminDto } from '../dto/AdminDto';
import { FuncionarioDto } from '../dto/FuncionarioDto';
import { ClienteDto } from '../dto/ClienteDto';
//------------------------------------------------
import { Clientes } from '../entity/clientes.entity';
import { Funcionarios } from '../entity/funcionarios.entity';
import { Admin } from '../entity/admin.entity';

@Injectable()
export class CadastroService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
    @InjectRepository(Funcionarios)
    private readonly funcionariosRepository: Repository<Funcionarios>,
  ) {}

  async cadastrarAdmin(adminDto: AdminDto): Promise<string> {
    try {
      const novoAdmin = this.adminRepository.create(adminDto);
      await this.adminRepository.save(novoAdmin);
      return 'Admin cadastrado com sucesso!';
    } catch (error) {
      throw new error('Erro ao cadastrar admin.');
    }
  }

  async cadastrarCliente(clienteDto: ClienteDto): Promise<string> {
    try {
      const novoCliente = this.clientesRepository.create(clienteDto);
      await this.clientesRepository.save(novoCliente);
      return 'Cliente cadastrado com sucesso!';
    } catch (error) {
      throw new error('Erro ao cadastrar cliente.');
    }
  }

  async cadastrarFuncionario(funcionarioDto: FuncionarioDto): Promise<string> {
    try {
      const novoFuncionario =
        this.funcionariosRepository.create(funcionarioDto);
      await this.funcionariosRepository.save(novoFuncionario);
      return 'Funcionário cadastrado com sucesso!';
    } catch (error) {
      throw new error('Erro ao cadastrar funcionário.');
    }
  }
}
