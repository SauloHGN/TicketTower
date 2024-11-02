import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blob } from 'buffer';
import { Anexos } from 'src/entity/anexos.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';

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
    anexo: Express.Multer.File | null,
  ) {
    const novaMensagem = new Mensagens();
    novaMensagem.id_ticket = { id: ticketID } as any;
    novaMensagem.mensagem = mensagem;
    novaMensagem.data_hora = new Date();
    novaMensagem.id_remetente = remetenteID;

    // if (!mensagem && !anexo) {
    //   return { status: 500, erro: 'Não é possível criar uma mensagem vazia' };
    // }

    // Salva a mensagem e obtém o ID gerado
    const mensagemSalva = await this.mensagemRepository.save(novaMensagem);

    // Verifica se o anexo existe
    if (anexo) {
      const anexoFile = new Anexos();
      const fileBuffer = await fs.readFile(anexo.path);
      anexoFile.anexo = fileBuffer; // Use o arquivo gerado em uploads
      anexoFile.nome_arquivo = anexo.originalname;
      anexoFile.tamanho = anexo.size.toString();
      anexoFile.tipo_arquivo = anexo.mimetype;
      anexoFile.id_mensagem = mensagemSalva;

      novaMensagem.id_anexo = anexoFile; // Adiciona a referência do anexo à mensagem


      const anexoSalvo = await this.anexoRepository.save(anexoFile);


      mensagemSalva.id_anexo = anexoSalvo; // Associa o anexo à mensagem
      await this.mensagemRepository.save(mensagemSalva); // Atualiza a mensagem


      await fs.unlink(anexo.path);
    }

    this.mensagemRepository.save(novaMensagem);

    return { status: 201, msg: 'Mensagem criada com sucesso' };
  }

  async listarMensagens(ticketID: string) {
    const mensagens = await this.mensagemRepository.find({
      where: { id_ticket: { id: ticketID } },
      relations: ['id_anexo'],
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

        const anexo = mensagem.id_anexo ? {
          id: mensagem.id_anexo.id,
          nome_arquivo: mensagem.id_anexo.nome_arquivo,
          tipo_arquivo: mensagem.id_anexo.tipo_arquivo,
          tamanho: await this.formatarTamanhoArquivo(mensagem.id_anexo.tamanho)
        } : null; // Se não houver anexo, retorna null

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
          anexo: anexo
        };
      }),
    );
  }

  async downloadAnexo(anexoId: number){

    const anexo = await this.anexoRepository.findOne({
      where: {id : anexoId}
    });

    if (!anexo) {
      return {status: 404, msg: 'Arquivo não encontrado', anexo: null}
    }

    return {status: 200, msg: 'Anexo encontrado', anexo: anexo}

  }

  async listarAnexos(ticketID: string) {
    const notas = await this.mensagemRepository.find({
      where: { id_ticket: { id: ticketID } },
      relations: ['id_anexo']
    });

    const anexos = await Promise.all(
      notas
        .map(mensagem => mensagem.id_anexo)
        .filter(anexo => anexo !== null) // Filtra para remover nulls
        .map(async anexo => ({
          id: anexo.id,
          nome_arquivo: anexo.nome_arquivo,
          tipo_arquivo: anexo.tipo_arquivo,
          tamanho: await this.formatarTamanhoArquivo(parseInt(anexo.tamanho)), // Formata o tamanho
        }))
    );

    return { status: 200, anexos: anexos };
  }


  async formatarTamanhoArquivo(tamanhoEmBytes: number):Promise <string> {
    const tamanhos = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;

    let tamanho = tamanhoEmBytes;

    while (tamanho >= 1024 && index < tamanhos.length - 1) {
      tamanho /= 1024;
      index++;
    }

    return `${tamanho.toFixed(2)} ${tamanhos[index]}`;
  }

}
