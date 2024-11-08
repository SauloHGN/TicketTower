import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { TicketService } from './ticket.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { MensagemService } from 'src/utils/mensagem/mensagem.service';
import { Response } from 'express';

import { InjectRepository } from '@nestjs/typeorm';
import { DataUtilsService } from 'src/repository/DataUtils.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly dataUtilsService: DataUtilsService ,

    private readonly funcionarioService: FuncionarioService,
    private readonly ticketService: TicketService,
    private readonly mensagemService: MensagemService,
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
  async listarNotas(
    @Param('ticketId') ticketId: string,
    @Body() body: { userID: string },
  ) {
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
  @UseInterceptors(FileInterceptor('file')) // intercepta o anexo
  async CriarNota(
    @Param('ticketId') ticketId: string,
    @Body() body: { mensagem: string; remetenteID: string },
    @UploadedFile() file: Express.Multer.File, // recebe o arquivo
  ) {
    const usuarioId = body.remetenteID;
    const value = await this.funcionarioService.getPermissaoByID(usuarioId);
    console.log(file)

    if (value.status !== 200) {
      return {
        status: value.status,
        mensagem: 'Não foi possível carregar os dados. ' + value.mensagem,
      };
    }

    return this.mensagemService.criarMensagem(
      ticketId,
      body.mensagem,
      body.remetenteID,
      file, // Buffer do arquivo
    );
  }

  @Get('/:ticketId/anexos')
  async listarAnexos(
    @Param('ticketId') ticketId: string,
  ) {
    const result = await this.mensagemService.listarAnexos(ticketId);

    return result;
  }

  @Get('/download/:anexoId')
  async downloadAnexo(@Param('anexoId') anexoId: number, @Res() response: Response) {
    const respostaAnexo = await this.mensagemService.downloadAnexo(anexoId)

    if (respostaAnexo.status != 200) {
      return respostaAnexo;
    }

    response.set({
      'Content-Type': respostaAnexo.anexo.tipo_arquivo,
      'Content-Disposition': `attachment; filename="${respostaAnexo.anexo.nome_arquivo}"`,
    });

    // Envia o conteúdo do arquivo
    return response.send(respostaAnexo.anexo.anexo);

  }

  @Patch('/:ticketId/transferirSetor')
  async transferirSetor(
    @Param('ticketId') ticketId: string,
    @Body() body: { novoSetor: number, userID: string },
  ) {

    const permissao = this.funcionarioService.getPermissaoByID(body.userID)

    if(!permissao){
      return {status: 403, msg: 'Usuario não autorizado'}
    }

    const result = await this.ticketService.transferirSetor(
      ticketId,
      body.novoSetor,
      body.userID
    );
    return result;
  }

  @Post('/:ticketId/encerrar')
  async encerrar(
    @Param('ticketId') ticketId: string,
    @Body() body: { userID: string },
  ) {
    const result = await this.ticketService.encerrarTicket(
      ticketId,
      body.userID,
    );
    return result;
  }

  @Get('/:ticketId/historicoSetor')
  async historicoSetor(
    @Param('ticketId') ticketId: string,
    @Body() body: { userID: string },
  ) {
    const transferencias = await this.ticketService.findHistoricoById(ticketId);

    // Formatação dos dados
    const transferenciasFormatadas = await Promise.all(
      transferencias.map(async transferencia => ({
        id: transferencia.id,
        usuario: await this.dataUtilsService.getEmailByID(transferencia.usuarioId), // Supondo que você tenha um método para obter o e-mail
        setorAnterior: transferencia.setorAnterior,
        setorNovo: transferencia.setorNovo,
        dataTransferencia: new Date(transferencia.dataTransferencia).toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      }))
    );


    return {
      status: 200,
      transferencias: transferenciasFormatadas,
    };
  }
}

