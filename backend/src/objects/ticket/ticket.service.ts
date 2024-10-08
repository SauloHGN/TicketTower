import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsavelDto } from 'src/dto/ResponsavelDto';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { Setores } from 'src/entity/setores.entity';
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

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketRepository: Repository<Tickets>,
    @InjectRepository(UsersView)
    private readonly usersView: Repository<UsersView>,

    private readonly setoresService: SetoresService,
    private readonly funcionarioService: FuncionarioService,
    private readonly dataUtilsService: DataUtilsService,
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
        };
      }),
    );

    return {
      status: 200,
      tickets: formattedTickets,
    };
  }

  formatDate(date: Date | null) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = date.getFullYear();

    let format = `${day}/${month}/${year}`;

    if (format == null || format.includes('null') || format == 'NaN/NaN/NaN') {
      format = '-';
    }
    return format; // Formata a data
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
}
