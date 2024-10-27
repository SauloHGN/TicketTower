import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blob } from 'buffer';
import { Anexos } from 'src/entity/anexos.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagens)
    private readonly mensagemRepository: Repository<Mensagens>,

    @InjectRepository(Anexos)
    private readonly anexoRepository: Repository<Anexos>,
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

    if(mensagem == null){
      return {status: 500, erro: 'Não é possivel criar uma mensagem vazia'}
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

    return { status: 200, mensagens: mensagens };
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
    return {status: 200, anexos: anexos};
  }
}
