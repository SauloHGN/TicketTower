import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets } from 'src/entity/ticket.entity';
import { Permissao } from 'src/enums/permissao';
import { SetoresService } from 'src/setores/setores.service';
import { Repository } from 'typeorm';

@Injectable()
export class RelatorioService {
  constructor(
    @InjectRepository(Tickets)
    private ticketsRepository: Repository<Tickets>,

    private readonly setoresService: SetoresService,
  ) {}

  // 1. Status  (To do, In progress, Done)
  async getResumeStatusTickets(userId: string, userType: string) {
    const query = this.ticketsRepository.createQueryBuilder('ticket');

    // Aplica filtros conforme o tipo de usuário
    if (userType === 'cliente') {
      query.where('ticket.aberto_por = :userId', { userId });
    } else if (userType === Permissao.ANALISTA) {
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
  async getPriorityTickets(userId: string, userType: string) {
    const query = this.ticketsRepository.createQueryBuilder('ticket');

    if (userType === 'cliente') {
      query.where('ticket.aberto_por = :userId', { userId });
    } else if (userType === 'analista') {
      query.where('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    const priorityDistribution = await query
      .select('ticket.prioridade')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('ticket.prioridade')
      .getRawMany();

    return priorityDistribution;
  }

  // 3. Ticket Evolution Over Time (Gráfico de Ondas)
  async getTicketEvolution(userId: string, userType: string) {
    const query = this.ticketsRepository.createQueryBuilder('ticket');

    if (userType === 'cliente') {
      query.where('ticket.aberto_por = :userId', { userId });
    } else if (userType === 'analista') {
      query.where('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    const ticketEvolution = await query
    .select("DATE_FORMAT(ticket.data_hora_abertura, '%d-%m-%Y')", 'date') // Formate a data
    .addSelect('COUNT(ticket.id)', 'count')
    .groupBy("DATE_FORMAT(ticket.data_hora_abertura, '%d-%m-%Y')")
    .orderBy('date', 'ASC')
    .getRawMany();

    return ticketEvolution;
  }

  // 4. Average Resolution Time by Priority or Sector (Gráfico de Barras)
  async getAverageResolutionTime(userId: string, userType: string) {
    const query = this.ticketsRepository
      .createQueryBuilder('ticket')
      .select('ticket.prioridade', 'priority')
      .addSelect(
        'IFNULL(AVG(TIMESTAMPDIFF(MINUTE, ticket.data_hora_abertura, ticket.data_hora_encerramento)), 0)',
        'avgResolutionTime',
      )
      .where('ticket.data_hora_encerramento IS NOT NULL')
      .groupBy('ticket.prioridade');

    if (userType === 'cliente') {
      query.andWhere('ticket.aberto_por = :userId', { userId });
    } else if (userType === 'analista') {
      query.andWhere('ticket.id_setor = :setorId', {
        setorId: await this.setoresService.getSetorUserByID(userId),
      });
    }

    const resolutionTimes = await query.getRawMany();
    return resolutionTimes;
  }
}
