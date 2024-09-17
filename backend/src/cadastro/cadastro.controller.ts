import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { FuncionarioDTO } from '../dto/FuncionarioDto';
import { ClienteDTO } from '../dto/ClienteDto';
import { CadastroService } from './cadastro.service';
import { EmpresaDTO } from 'src/dto/EmpresaDto';
import { SetorDTO } from 'src/dto/SetorDto';
import { EnderecoDto } from 'src/dto/EnderecoDto';
import { EmpresasService } from 'src/empresas/empresas.service';

@Controller('cadastro')
export class CadastroController {
  constructor(
    private readonly cadastroService: CadastroService,
    private readonly empresaService: EmpresasService,
  ) {}

  @Post(':funcionarioId/cliente')
  cadastrarCliente(
    @Param('funcionarioId') funcionarioId: string,
    @Body() clienteDto: ClienteDTO,
  ) {
    console.log(clienteDto);
    return this.cadastroService.cadastrarCliente(
      String(funcionarioId),
      clienteDto,
    );
  }

  @Post(':funcionarioId/funcionario')
  cadastrarFuncionario(
    @Param('funcionarioId') funcionarioId: string,
    @Body() funcionarioDto: FuncionarioDTO,
  ) {
    return this.cadastroService.cadastrarFuncionario(
      String(funcionarioId),
      funcionarioDto,
    );
  }

  @Post('endereco')
  cadastrarEndereco(@Body() enderecoDto: EnderecoDto) {
    return this.cadastroService.cadastrarEndereco(enderecoDto);
  }

  @Post('empresa')
  cadastrarEmpresa(@Body() empresaDto: EmpresaDTO) {
    return this.cadastroService.cadastrarEmpresa(empresaDto);
  }

  @Post('setor')
  cadastrarSetor(@Body() setorDto: SetorDTO) {
    return this.cadastroService.cadastrarSetor(setorDto);
  }

  @Get('nomeEmpresa')
  obterIdEmpresa(@Query('nome') nome: string) {
    return this.empresaService.obterIdEmpresaPorNome(nome);
  }
}
