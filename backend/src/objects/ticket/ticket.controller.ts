import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TicketService } from './ticket.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly ticketService: TicketService,
  ) {}

  @Post('/criar')
  @UseInterceptors(FilesInterceptor('file'))
  async create(
    @Body()
    body: {
      userID: string;
      titulo: string;
      classificacao: string;
      descricao: string;
      setor: string;
      prioridade: string;
    },
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = this.ticketService.createTicket(
      body.userID,
      body.titulo,
      body.classificacao,
      body.descricao,
      body.setor,
      body.prioridade,
    );

    return result;
  }

  @Get('/:id')
  async load(@Param('id') id: string) {
    //Captar a permissão do usuario para definr quais tickets serão exibidos
    const value = await this.funcionarioService.getPermissaoByID(id);
    console.log(value);
    // Caso não seja possivel captar a permissão
    if (value.permissao == null) {
      return {
        status: value.status,
        mensagem: 'Não foi possivel carregar os dados.',
      };
    }

    // Carregar dados dos tickets
    const result = this.ticketService.loadData(id, value.permissao);

    return result;
  }
}
