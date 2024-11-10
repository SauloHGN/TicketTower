import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets } from 'src/entity/ticket.entity';
import { Permissao } from 'src/enums/permissao';
import { StatusTicket } from 'src/enums/statusTicket';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { SetoresService } from 'src/setores/setores.service';
import { UtilsService } from 'src/utils/utils.service';
import { Repository } from 'typeorm';

@Injectable()
export class RelatorioService {
  constructor(
    @InjectRepository(Tickets)
    private ticketsRepository: Repository<Tickets>,

    private readonly setoresService: SetoresService,
    private readonly utilsService: DataUtilsService,
  ) {}

  // 1. Status  (To do, In progress, Done)
  async getResumeStatusTickets(userId: string, userType: string) {
    const permissao = await this.utilsService.getRoleByID(userId);

    if (!permissao) {
      return { status: 401, msg: 'Usuario não autorizado' };
    }

    const query = this.ticketsRepository.createQueryBuilder('ticket');

    // Aplica filtros conforme o tipo de usuário
    if (permissao === 'cliente') {
      query.where('ticket.aberto_por = :userId', { userId });
    } else if (permissao === Permissao.ANALISTA) {
      query.where('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    // Consulta de contagem por status
    const statusSummary = await query
      .select('ticket.status')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('ticket.status')
      .getRawMany();

    return statusSummary;
  }

  // 2. Priority Distribution (Gráfico Circular)
  async getPriorityTickets(userId: string, userType: string, periodo: string) {
    const permissao = await this.utilsService.getRoleByID(userId);

    if (!permissao) {
      return { status: 401, msg: 'Usuario não autorizado' };
    }

    const query = this.ticketsRepository.createQueryBuilder('ticket');

    // Adiciona filtro por userId ou setorId dependendo do tipo de usuário
    if (permissao === 'cliente') {
      query.where('ticket.aberto_por = :userId', { userId });
    } else if (permissao === 'analista') {
      query.where('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    const currentDate = new Date();
    let startOfPeriod: Date | string = currentDate;

    // Filtro baseado no período (hoje, semana, mês, ano)
    switch (periodo) {
      case 'hoje':
        // Converter a data atual para formato YYYY-MM-DD
        startOfPeriod = currentDate.toISOString().split('T')[0];
        query.andWhere('DATE(ticket.data_hora_abertura) = :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'semana':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Primeiro dia da semana
        startOfPeriod = startOfWeek.toISOString().split('T')[0];
        query.andWhere('ticket.data_hora_abertura >= :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'mes':
        const startOfMonth = new Date(currentDate);
        startOfMonth.setDate(1); // Primeiro dia do mês
        startOfPeriod = startOfMonth.toISOString().split('T')[0];
        query.andWhere('ticket.data_hora_abertura >= :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'ano':
        const startOfYear = new Date(currentDate);
        startOfYear.setMonth(0, 1); // Primeiro dia do ano
        startOfPeriod = startOfYear.toISOString().split('T')[0];
        query.andWhere('ticket.data_hora_abertura >= :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'todo_periodo':
        // Sem filtro de data
        break;
      default:
        // default será igual a todo o periodo
        break;
    }

    // Realiza a consulta agrupando por prioridade
    const priorityDistribution = await query
      .select('ticket.prioridade')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('ticket.prioridade')
      .getRawMany();

    return priorityDistribution;
  }

  // 3. Ticket Evolution Over Time (Gráfico de Barras)
  async getTicketEvolution(userId: string, userType: string) {
    const permissao = await this.utilsService.getRoleByID(userId);

    if (!permissao) {
      return { status: 401, msg: 'Usuario não autorizado' };
    }

    const query = this.ticketsRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.id_setor', 'setor'); // Realiza a junção para obter o nome do setor

    if (permissao === 'cliente') {
      query.where('ticket.aberto_por = :userId', { userId });
    } else if (permissao === 'analista') {
      query.where('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    const ticketEvolution = await query
      .select("DATE_FORMAT(ticket.data_hora_abertura, '%Y-%m')", 'month') // Agrupar por mês
      .addSelect('setor.nome', 'setor') // Selecionar o nome do setor
      .addSelect('COUNT(ticket.id)', 'count') // Contagem de tickets
      .groupBy("DATE_FORMAT(ticket.data_hora_abertura, '%Y-%m')")
      .addGroupBy('setor.nome') // Agrupar também pelo nome do setor
      .orderBy('month', 'ASC')
      .addOrderBy('setor', 'ASC')
      .getRawMany();

    return ticketEvolution;
  }

  // 4. Average Resolution Time by Priority or Sector (Gráfico de Ondas)
  async getAverageResolutionTime(
    userId: string,
    userType: string,
    periodo: string,
  ) {
    const permissao = await this.utilsService.getRoleByID(userId);

    if (!permissao) {
      return { status: 401, msg: 'Usuario não autorizado' };
    }

    const query = this.ticketsRepository
      .createQueryBuilder('ticket')
      .select('ticket.prioridade', 'priority')
      .addSelect(
        'IFNULL(AVG(TIMESTAMPDIFF(MINUTE, ticket.data_hora_abertura, ticket.data_hora_encerramento)), 0)',
        'avgResolutionTime',
      )
      .where('ticket.data_hora_encerramento IS NOT NULL') // Apenas tickets que foram encerrados
      .groupBy('ticket.prioridade'); // Agrupar por prioridade

    // Filtro para tipo de usuário (cliente ou analista)
    if (permissao === 'cliente') {
      query.andWhere('ticket.aberto_por = :userId', { userId });
    } else if (permissao === 'analista') {
      query.andWhere('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    const currentDate = new Date();
    let startOfPeriod: Date | string = currentDate;

    switch (periodo) {
      case 'hoje':
        // Para "hoje", usamos a data atual com hora zerada
        startOfPeriod = currentDate.toISOString().split('T')[0]; // Ex: "2024-11-09"
        query.andWhere('DATE(ticket.data_hora_encerramento) = :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'semana':
        // Para "semana", calculamos o primeiro dia da semana (domingo ou segunda-feira, dependendo da sua lógica)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Primeiro dia da semana (domingo)
        startOfPeriod = startOfWeek.toISOString().split('T')[0];
        query.andWhere('ticket.data_hora_encerramento >= :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'mes':
        // Para "mês", pegamos o primeiro dia do mês atual
        const startOfMonth = new Date(currentDate);
        startOfMonth.setDate(1); // Primeiro dia do mês
        startOfPeriod = startOfMonth.toISOString().split('T')[0];
        query.andWhere('ticket.data_hora_encerramento >= :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'ano':
        // Para "ano", pegamos o primeiro dia do ano atual
        const startOfYear = new Date(currentDate);
        startOfYear.setMonth(0, 1); // Primeiro dia do ano
        startOfPeriod = startOfYear.toISOString().split('T')[0];
        query.andWhere('ticket.data_hora_encerramento >= :startOfPeriod', {
          startOfPeriod,
        });
        break;
      case 'todo_periodo':
        // Sem filtro de data, exibe todos os tickets
        break;
      default:
        // Caso nenhum período seja especificado, consideramos "todo período"
        break;
    }

    // Executa a consulta e retorna os dados
    const resolutionTimes = await query.getRawMany();

    // Formatação do tempo de resolução para "Xh Ym"
    const formattedResolutionTimes = resolutionTimes.map((item) => {
      const totalMinutes = item.avgResolutionTime;
      const hours = Math.floor(totalMinutes / 60); // Calcula as horas
      const minutes = totalMinutes % 60; // Resto é o número de minutos
      item.avgResolutionTime = `${hours}h ${minutes}m`; // Formata o tempo como "Xh Ym"
      return item;
    });

    return formattedResolutionTimes;
  }

  async getDashboardMetrics(userId: string, userType: string) {
    const permissao = await this.utilsService.getRoleByID(userId);

    // Variáveis para armazenar os resultados
    let ticketsResolvidos = 0;
    let taxaResolucao = 0;

    let ticketsAbertos = 0;
    let totalTickets = 0;

    let totalFechados = 0;
    let taxaFechados = 0;

    let TotalVencidos = 0


    // Ajusta a consulta de acordo com a permissão
    let query = this.ticketsRepository.createQueryBuilder('ticket');

    // Filtra a consulta de acordo com a permissão do usuário
    if (permissao) {
      if (permissao === 'cliente') {
        query.andWhere('ticket.aberto_por = :userId', { userId });
      } else if (permissao === 'analista') {
        const setorId = await this.setoresService.getSetorUserByID(userId);
        query.andWhere('ticket.id_setor = :setorId', { setorId });
      }
    }

    // Calcular a Quantidade de Tickets Abertos
    ticketsAbertos = await this.calcularQuantidadeTicketsAbertos(
      userId,
      permissao,
    );

    // Calcular a Taxa de Resolução
    taxaResolucao = await this.calcularTaxaResolução(userId, permissao);

    // Contabiliza todos os tickets
    totalTickets = await query.getCount();

    // Contabiliza apenas os tickets resolvidos (status = "Resolvido")
    ticketsResolvidos = await query
      .andWhere('ticket.status = :status', { status: StatusTicket.RESOLVIDO })
      .getCount();


    totalFechados = await query
      .andWhere('ticket.status = :status', { status: StatusTicket.FECHADO })
      .getCount();

    let totalVencidos = await this.calcularTaxaVencimento(userId, permissao);

    taxaFechados = (totalFechados / totalTickets) * 100;

    // Calcular a Taxa de Resolução
    if (totalTickets === 0) {
      taxaResolucao = 0;
    } else {
      taxaResolucao = (ticketsResolvidos / totalTickets) * 100;
    }

    // Retornar as métricas
    return {
      taxaResolucao,
      ticketsResolvidos,

      ticketsAbertos,
      totalTickets,

      taxaVencimento: totalVencidos.taxaVencimento,
      ticketsVencidos: totalVencidos.ticketsVencidos,

      totalFechados,
      taxaFechados
    };
  }

  async calcularTaxaResolução(
    userId: string,
    permissao: string,
  ): Promise<number> {
    let query = this.ticketsRepository.createQueryBuilder('ticket');

    // Filtrar de acordo com a permissão do usuário
    if (permissao === 'cliente') {
      query.andWhere('ticket.aberto_por = :userId', { userId });
    } else if (permissao === 'analista') {
      const setorId = await this.setoresService.getSetorUserByID(userId);
      query.andWhere('ticket.id_setor = :setorId', { setorId });
    }

    // Contabiliza todos os tickets
    const totalTickets = await query.getCount();

    // Contabiliza apenas os tickets resolvidos (status = "Resolvido")
    const ticketsResolvidos = await this.ticketsRepository.count({
      where: { status: StatusTicket.RESOLVIDO },
    });

    if (totalTickets === 0) return 0;

    // Retorna a taxa de resolução
    return (ticketsResolvidos / totalTickets) * 100;
  }

  async calcularQuantidadeTicketsAbertos(
    userId: string,
    permissao: string,
  ): Promise<number> {
    let query = this.ticketsRepository.createQueryBuilder('ticket');

    if (permissao === 'cliente') {
      query.andWhere('ticket.aberto_por = :userId', { userId });
    } else if (permissao === 'analista') {
      const setorId = await this.setoresService.getSetorUserByID(userId);
      query.andWhere('ticket.id_setor = :setorId', { setorId });
    }

    query.andWhere('ticket.status IN (:status1, :status2)', {
      status1: StatusTicket.ABERTO,
      status2: StatusTicket.EMANDAMENTO,
    });

    return query.getCount();
  }

  async calcularTaxaVencimento(
    userId: string,
    permissao: string,
  ): Promise<any> {
    let query = this.ticketsRepository.createQueryBuilder('ticket');

    // Filtrar de acordo com a permissão do usuário
    if (permissao === 'cliente') {
      query.andWhere('ticket.aberto_por = :userId', { userId });
    } else if (permissao === 'analista') {
      const setorId = await this.setoresService.getSetorUserByID(userId);
      query.andWhere('ticket.id_setor = :setorId', { setorId });
    }

    // Calcular o total de tickets resolvidos
    const ticketsResolvidos = await query
      .andWhere('ticket.status = :status', { status: StatusTicket.RESOLVIDO })
      .getCount();

    if (ticketsResolvidos === 0) return 0;

    // Calcular a taxa de vencimento considerando o SLA de cada ticket
    let ticketsVencidos = 0;

    // Consultar os tickets resolvidos (Resolvido) e verificar vencimento
    const tickets = await query
      .leftJoinAndSelect('ticket.sla', 'sla') // Assumindo que o relacionamento SLA esteja configurado
      .andWhere('ticket.status = :status', { status: StatusTicket.RESOLVIDO })
      .getMany();

    for (const ticket of tickets) {
      // Verificar se o ticket ultrapassou o prazo máximo do SLA
      const tempoResolucao =
        new Date(ticket.data_hora_encerramento).getTime() -
        new Date(ticket.data_hora_abertura).getTime();

      // Convertendo o tempo de resolução do SLA para milissegundos (tempo_resolucao está em minutos)
      const prazoSLA = ticket.sla.tempo_resolucao * 60 * 1000; // Convertendo de minutos para milissegundos

      if (tempoResolucao > prazoSLA) {
        ticketsVencidos++;
      }
    }

    // Calcular a taxa de vencimento em %
    const taxaVencimento =
      tickets.length > 0 ? (ticketsVencidos / tickets.length) * 100 : 0;

    return { taxaVencimento, ticketsVencidos };
  }
}
