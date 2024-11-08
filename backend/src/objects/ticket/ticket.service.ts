import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsavelDto } from 'src/dto/ResponsavelDto';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { Setores } from 'src/entity/setores.entity';
import { Sla } from 'src/entity/sla.entity';
import { Tickets } from 'src/entity/ticket.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { AbertoPorTipo } from 'src/enums/abertoPor';
import { Prioridade } from 'src/enums/prioridade';
import { StatusTicket } from 'src/enums/statusTicket';
import { ticketClassify } from 'src/enums/ticketClassify';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { SetoresService } from 'src/setores/setores.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { SlaService } from '../sla/sla.service';
import { EmailService } from 'src/email/email.service';
import { TicketTransfer } from 'src/entity/ticketTransfer.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketRepository: Repository<Tickets>,
    @InjectRepository(UsersView)
    private readonly usersView: Repository<UsersView>,
    @InjectRepository(Sla)
    private readonly slaRepository: Repository<Sla>,
    @InjectRepository(Setores)
    private readonly setoresRepository: Repository<Setores>,
    @InjectRepository(TicketTransfer)
    private readonly ticketTransferRepository: Repository<TicketTransfer>,

    private readonly setoresService: SetoresService,
    private readonly funcionarioService: FuncionarioService,
    private readonly dataUtilsService: DataUtilsService,
    private readonly slaService: SlaService,
    private readonly emailService: EmailService,
  ) {}

  async createTicket(
    userID: string,
    titulo: string,
    classificacao: string,
    descricao: string,
    setor: string,
    prioridade: string,
  ) {
    const ticketID = await this.createTicketID(classificacao);
    if (ticketID.includes(null)) {
      return { status: 400, msg: 'Erro ao criar ticket' };
    }
    const setorID = await this.setoresService.getSetorByID(parseInt(setor));

    let prioridadeEnum: Prioridade; // Captar Prioridade com base no ENUM
    if (Object.values(Prioridade).includes(prioridade as Prioridade)) {
      prioridadeEnum = prioridade as Prioridade;
    } else {
      return { status: 400, msg: 'Prioridade inválida' };
    }

    const abertoPorTipo = await this.dataUtilsService.getRoleByID(userID);
    if (abertoPorTipo == null) {
      return {
        status: 400,
        msg: 'Erro ao criar ticket. usuario não pode ser classificado',
      };
    }

    if (
      classificacao == 'solicitacao de servico' ||
      classificacao == 'solicitação de serviço'
    ) {
      classificacao = 'solicitacao_de_servico';
    }

    const sla = await this.slaRepository.findOne({
      where: {
        ticket_tipo: classificacao,
        prioridade: prioridadeEnum,
      },
    });

    if (!sla) {
      return {
        status: 400,
        msg: 'SLA não encontrada para este tipo de ticket e prioridade',
      };
    }

    // Cria uma nova instância de Ticket
    const newTicket = new Tickets();
    newTicket.id = ticketID;
    newTicket.titulo = titulo;
    newTicket.aberto_por = userID;
    newTicket.aberto_por_tipo =
      abertoPorTipo == 'funcionario'
        ? AbertoPorTipo.FUNCIONARIO
        : AbertoPorTipo.CLIENTE;
    newTicket.descricao = descricao;
    newTicket.id_setor = setorID;
    newTicket.prioridade = prioridadeEnum;
    newTicket.sla = sla;

    try {
      // Salva o novo ticket no banco de dados
      await this.ticketRepository.save(newTicket);
      return {
        status: 201,
        msg: 'Ticket criado com sucesso',
        ticket: newTicket,
      };
    } catch (error) {
      console.error('Erro ao criar ticket:', error);
      return { status: 500, msg: 'Erro ao criar ticket no banco de dados' };
    }
  }

  async createTicketID(classificacao): Promise<string> {
    //Codigo: [Classificação][Data][Sequencial]
    const tipo = await this.getTicketType(classificacao);
    const data = await this.getCurrentDate();
    const sequencial = await this.getSequencial(data);

    return `${tipo}${data}${sequencial}`;
  }

  async getSequencial(data: string): Promise<string> {
    const year = parseInt(data.slice(0, 4));
    const month = parseInt(data.slice(4, 6)) - 1;
    const day = parseInt(data.slice(6, 8));

    const startDate = new Date(year, month, day);
    const endDate = new Date(year, month, day + 1);

    const count = await this.ticketRepository.count({
      where: [
        { data_hora_abertura: MoreThanOrEqual(startDate) },
        { data_hora_abertura: LessThan(endDate) },
      ],
    });

    const sequenceNumber = count + 1; // Incrementa a contagem
    return sequenceNumber.toString().padStart(6, '0'); // preenche com 0's a esquerda
  }

  getTicketType(classificacao: string): ticketClassify | null {
    switch (classificacao.toLowerCase()) {
      case 'mudança':
      case 'mudanca':
      case 'change':
        return ticketClassify.MUDANCA;

      case 'incidente':
        return ticketClassify.INCIDENTE;

      case 'solicitação de serviço':
      case 'solicitacao de servico':
        return ticketClassify.SOLICITACAO_SERVICO;

      case 'problema':
        return ticketClassify.PROBLEMA;

      default:
        return null;
    }
  }

  getCurrentDate(): string {
    const actualDate = new Date();

    const year = actualDate.getFullYear();
    const month = String(actualDate.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const day = String(actualDate.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  }

  async loadData(id: string, permissao: string) {
    let tickets;

    if (permissao === 'funcionario') {
      const funcionario = await this.funcionarioService.getSetorByID(id);
      tickets = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.id_setor', 'setor')
        .where('setor.id = :setorId', { setorId: funcionario.setor })
        .getMany();
    } else if (permissao === 'cliente') {
      tickets = await this.ticketRepository.find({
        where: { aberto_por: id },
      });
    } else if (permissao === 'administrador') {
      tickets = await this.ticketRepository.find();
    } else {
      return {
        status: 404,
        mensagem: 'Permissao não conhecida',
        tickets: null,
      };
    }

    const formattedTickets = await Promise.all(
      tickets.map(async (ticket) => {
        const email = await this.dataUtilsService.getEmailByID(
          ticket.aberto_por,
        );
        const email_responsavel = ticket.id_responsavel
          ? await this.dataUtilsService.getEmailByID(ticket.id_responsavel.id)
          : 'N/A'; // Mensagem padrão se não houver responsável

        return {
          id: ticket.id,
          data_hora_abertura: this.formatDate(ticket.data_hora_abertura),
          data_hora_encerramento: ticket.data_hora_encerramento
            ? this.formatDate(ticket.data_hora_encerramento)
            : '-',
          aberto_por: email,
          aberto_por_tipo: ticket.aberto_por_tipo,
          status: ticket.status,
          prioridade: ticket.prioridade,
          titulo: ticket.titulo,
          descricao: ticket.descricao,
          id_setor: ticket.id_setor,
          responsavel: email_responsavel, // Utiliza o valor padrão aqui
          prazo_resposta: await this.deadlineTickets(ticket.data_hora_abertura, ticket.sla.tempo_resposta),
          prazo_resolucao: await this.deadlineTickets(ticket.data_hora_abertura, ticket.sla.tempo_resolucao),
        };
      }),
    );

    return {
      status: 200,
      tickets: formattedTickets,
    };
  }


  async formatTicket(ticket){

    const email = await this.dataUtilsService.getEmailByID(ticket.aberto_por);
    const email_responsavel = ticket.id_responsavel
      ? await this.dataUtilsService.getEmailByID(ticket.id_responsavel.id)
      : 'N/A'; // Mensagem padrão se não houver responsável

    return {
      id: ticket.id,
      data_hora_abertura: this.formatDate(ticket.data_hora_abertura),
      data_hora_encerramento: ticket.data_hora_encerramento
        ? this.formatDate(ticket.data_hora_encerramento)
        : '-',
      aberto_por: email,
      aberto_por_tipo: ticket.aberto_por_tipo,
      status: ticket.status,
      prioridade: ticket.prioridade,
      titulo: ticket.titulo,
      descricao: ticket.descricao,
      id_setor: ticket.id_setor,
      responsavel: email_responsavel, // Utiliza o valor padrão aqui
      prazo_resposta: await this.deadlineTickets(ticket.data_hora_abertura, ticket.sla.tempo_resposta),
      prazo_resolucao: await this.deadlineTickets(ticket.data_hora_abertura, ticket.sla.tempo_resolucao),
    }
  }

  formatDate(date: Date | null) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = date.getFullYear();

    let format = `${day}/${month}/${year}`;

    if (format == null || format.includes('null') || format == 'NaN/NaN/NaN') {
      format = '-';
    }
    return format;
  }

  async deadlineTickets(openingDate: Date, tempo: number) {
    // Garantir que openingDate é um objeto Date


    const openingDateObject = new Date(openingDate);


    const prazo = new Date(openingDateObject); // Cria uma nova data a partir da data de abertura
    prazo.setMinutes(prazo.getMinutes() + tempo); // Adiciona os minutos



    const day = String(prazo.getDate()).padStart(2, '0'); // Dia com 2 dígitos
    const month = String(prazo.getMonth() + 1).padStart(2, '0'); // Mês com 2 dígitos
    const year = prazo.getFullYear(); // Ano
    const hours = String(prazo.getHours()).padStart(2, '0'); // Horas com 2 dígitos
    const minutes = String(prazo.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  async adotarTicket(userID: string, ticketID: string) {
    const userResponsavel = await this.dataUtilsService.getUserByID(userID);

    if (!userResponsavel) {
      return { status: 404, msg: 'Usuário não encontrado ou inativo' };
    }

    const responsavelDto: ResponsavelDto = {
      id: userResponsavel.id,
      email: userResponsavel.email,
    };

    const updates: Partial<Tickets> = {
      id_responsavel: responsavelDto, // A entidade completa é necessária
      status: StatusTicket.EMANDAMENTO,
    };

    const result = await this.updateTicket(ticketID, updates);

    if (result && 'status' in result) {
      return result;
    }

    return { status: 200, ticket: result };
  }

  async getTicketByID(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['id_responsavel', 'id_setor'],
    });

    return ticket || null;
  }

  async updateTicket(id: string, updates: Partial<Tickets>) {
    try {
      const ticket = await this.getTicketByID(id);

      if (!ticket) {
        return { status: 404, msg: 'Ticket não encontrado' };
      }

      await this.ticketRepository.update(id, updates); // Atualizar o ticket

      const updatedTicket = await this.getTicketByID(id); // Buscando o ticket atualizado

      return {
        id: updatedTicket.id,
        data_hora_abertura: updatedTicket.data_hora_abertura,
        data_hora_encerramento: updatedTicket.data_hora_encerramento,
        aberto_por: updatedTicket.aberto_por,
        aberto_por_tipo: updatedTicket.aberto_por_tipo,
        status: updatedTicket.status,
        prioridade: updatedTicket.prioridade,
        titulo: updatedTicket.titulo,
        descricao: updatedTicket.descricao,
        id_setor: {
          id: updatedTicket.id_setor.id,
          nome: updatedTicket.id_setor.nome,
        },
        responsavel: {
          id: updatedTicket.id_responsavel.id,
          email: updatedTicket.id_responsavel.email,
        } as ResponsavelDto,
      };
    } catch (error) {
      return { status: 500, msg: 'Erro ao atualizar ticket' };
    }
  }


  async getTicketInfo(ticketID: string){
    try{
      const ticket = await this.ticketRepository.findOne({
        where: {id: ticketID}
      })

      const dadosTicket = await this.formatTicket(ticket);

      return {status: 200, ticket: dadosTicket, msg:'Consulta bem sucedida' }

    }catch(error){
      return {status: 500, ticket: null, msg:'Ocorreu um erro no processamento:\n' + error}
    }

  }

  async transferirSetor(ticketID: string, novoSetor: number, userID: string) {
    try {
      // Encontra o ticket com o ID fornecido
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketID }
      });

      // Ticket não encontrado
      if (!ticket) {
        return { status: 404, msg: 'Ticket não encontrado' };
      }

      const setor = await this.setoresRepository.findOne({
        where: { id: novoSetor }
      });

      const setorAntigo = ticket.id_setor

      const ticketTransfer = new TicketTransfer();
      ticketTransfer.setorAnterior = setorAntigo;
      ticketTransfer.setorNovo = await this.setoresService.getSetorByID(novoSetor);
      ticketTransfer.ticket = ticket
      ticketTransfer.usuarioId = userID

      this.ticketTransferRepository.save(ticketTransfer);


      // Verifica se o novo setor foi encontrado
      if (!setor) {
        return { status: 404, msg: 'Novo setor não encontrado' };
      }

      // Atualiza o setor do ticket
      ticket.id_responsavel = null;
      ticket.id_setor = setor;

      // Salvar alteração
      await this.ticketRepository.save(ticket);

      return { status: 200, msg: 'Setor transferido com sucesso' };

    } catch (error) {
      return { status: 500, msg: 'Ocorreu um erro no processamento:\n' + error.message };
    }
  }

  async findHistoricoById(ticketID: string){
    return this.ticketTransferRepository.find({
      where: { ticket: {id: ticketID}}
    })
  }

  async encerrarTicket(ticketID: string, userID: string) {
    try {

      const user = await this.funcionarioService.getPermissaoByID(userID)

      if(!user){
        return {status: 403, msg: 'Acesso negado'}
      }

      const email = this.dataUtilsService.getEmailByID(userID)

      // Encontra o ticket com o ID fornecido
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketID }
      });

      // Ticket não encontrado
      if (!ticket) {
        return { status: 404, msg: 'Ticket não encontrado' };
      }

      // Atualiza o setor do ticket
      ticket.status = StatusTicket.RESOLVIDO;

      // Salvar alteração
      await this.ticketRepository.save(ticket);

      this.emailService.sendMessageEmail(ticket.aberto_por, "Seu ticket foi resolvido!", `Seu ticket com código: ${ticket.id} \n foi encerrado por ${email}, com status: Resolvido.`)

    }catch(error){
      return { status: 500, msg: 'Erro ao encerrar ticket' };
    }
  }


}
