import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TicketService } from './ticket.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { MensagemService } from 'src/utils/mensagem/mensagem.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly ticketService: TicketService,
    private readonly mensagemService: MensagemService
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

  @Get('/detalhes/:ticketID')
  async getTicketInfo(@Param('ticketID') ticketID: string) {
    const result = this.ticketService.getTicketInfo(ticketID);
    return result;
  }

  @Get('/:id')
  async load(@Param('id') id: string) {
    //Captar a permissão do usuario para definr quais tickets serão exibidos
    const value = await this.funcionarioService.getPermissaoByID(id);
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

  @Patch('/adotar')
  async adotarTicket(@Body() body: { userID: string; ticketID: string }) {
    const result = this.ticketService.adotarTicket(body.userID, body.ticketID);
    return result;
  }


  @Get('/:ticketId/notas')
  async listarNotas(@Param('ticketId') ticketId: string, @Body() body: { userID: string }) {
    const usuarioId = body.userID;
    const value = await this.funcionarioService.getPermissaoByID(usuarioId);

    if (value.permissao == null) {
      return {
        status: value.status,
        mensagem: 'Não foi possivel carregar os dados.',
      };
    }

    return this.mensagemService.listarMensagens(ticketId);
  }

  @Post('/:ticketId/criarNota')
  async CriarNota(@Param('ticketId') ticketId: string, @Body() body: { mensagem: string; remetenteID: string, anexo: Buffer }) {
    const usuarioId = body.remetenteID;
    const value = await this.funcionarioService.getPermissaoByID(usuarioId);

    if (value.permissao == null) {
      return {
        status: value.status,
        mensagem: 'Não foi possivel carregar os dados. '+ value.mensagem,
      };
    }

    return this.mensagemService.criarMensagem(ticketId, body.mensagem, body.remetenteID, body.anexo);
  }

  @Get('/:ticketId/anexos')
  async listarAnexos(@Param('ticketId') ticketId: string, @Body() body: { mensagemID: number }){

    const result = await this.mensagemService.listarAnexos(body.mensagemID)

    return result;
  }


  @Get('/:ticketId/criarAnexo')
  async criarAnexo(@Param('ticketId') ticketId: string, @Body() body: { nomeArquivo: string, tipoArquivo: string, anexo: Buffer }){

    const result = await this.mensagemService.criarAnexo(ticketId, body.nomeArquivo, body.tipoArquivo, body.anexo)

    return result;
  }

}
