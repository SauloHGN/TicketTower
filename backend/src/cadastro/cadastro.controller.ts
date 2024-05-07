import { Controller, Post, Body } from '@nestjs/common';
import { AdminDto } from '../dto/AdminDto';
import { FuncionarioDto } from '../dto/FuncionarioDto';
import { ClienteDto } from '../dto/ClienteDto';
import { CadastroService } from './cadastro.service';

@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post('admin')
  cadastrarAdmin(@Body() adminDto: AdminDto) {
    return this.cadastroService.cadastrarAdmin(adminDto);
  }

  @Post('cliente')
  cadastrarCliente(@Body() clienteDto: ClienteDto) {
    return this.cadastroService.cadastrarCliente(clienteDto);
  }

  @Post('funcionario')
  cadastrarFuncionario(@Body() funcionarioDto: FuncionarioDto) {
    return this.cadastroService.cadastrarFuncionario(funcionarioDto);
  }
}
