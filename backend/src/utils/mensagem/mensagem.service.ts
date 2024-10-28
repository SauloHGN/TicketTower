import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blob } from 'buffer';
import { Anexos } from 'src/entity/anexos.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { Repository } from 'typeorm';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagens)
    private readonly mensagemRepository: Repository<Mensagens>,

    @InjectRepository(Anexos)
    private readonly anexoRepository: Repository<Anexos>,

    private readonly dataUtilsService: DataUtilsService,
  ) {}

  async criarMensagem(
    ticketID: string,
    mensagem: string,
    remetenteID: string,
    anexo: Buffer,
  ) {
    const novaMensagem = new Mensagens();
    novaMensagem.id_ticket = { id: ticketID } as any;
    novaMensagem.mensagem = mensagem;
    novaMensagem.data_hora = new Date();
    novaMensagem.id_remetente = remetenteID;

    if (mensagem == null) {
      return { status: 500, erro: 'Não é possivel criar uma mensagem vazia' };
    }

    // Verifica se o anexo existe
    if (anexo) {
      novaMensagem.id_anexo = { conteudo: anexo } as any;
    }

    this.mensagemRepository.save(novaMensagem);

    return { status: 201, msg: 'Mensagem criada com sucesso' };
  }

  async listarMensagens(ticketID: string) {
    const mensagens = await this.mensagemRepository.find({
      where: { id_ticket: { id: ticketID } },
    });

    const mensagensFormat = await this.formatarMensagens(mensagens);

    return { status: 200, mensagens: mensagensFormat };
  }

  async formatarMensagens(mensagens: any[]): Promise<any[]> {
    // Usar Promise.all para aguardar todas as Promises
    return Promise.all(
      mensagens.map(async (mensagem) => {
        const usuario = await this.dataUtilsService.getUserByID(
          mensagem.id_remetente,
        );
        return {
          id: mensagem.id,
          mensagem: mensagem.mensagem,
          data_hora: new Date(mensagem.data_hora).toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
          nome: usuario ? usuario.nome : '...', // ... para usuários não encontrados
        };
      }),
    );
  }

  async criarAnexo(
    ticketID: string,
    nome_arquivo: string,
    tipo_arquivo: string,
    anexo: Buffer,
  ) {
    const novoAnexo = new Anexos();
    novoAnexo.nome_arquivo = nome_arquivo;
    novoAnexo.tipo_arquivo = tipo_arquivo;
    novoAnexo.anexo = anexo; // Armazena o arquivo binário

    // Salva o anexo no banco de dados
    await this.anexoRepository.save(novoAnexo);
    return { status: 201, msg: 'Anexo salvo com sucesso' };
  }

  async listarAnexos(mensagemID: number) {
    const anexos = await this.anexoRepository.find({
      where: { id_mensagem: { id: mensagemID } },
    });
    return { status: 200, anexos: anexos };
  }
}
