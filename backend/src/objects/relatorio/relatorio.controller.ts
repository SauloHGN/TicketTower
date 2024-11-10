import { Controller, Get, Param, Query } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get('ticketStatus/:userID/:userType')
  async getStatusSummary(
    @Param('userID') userID: string,
    @Param('userType') userType: string,
  ) {
    return this.relatorioService.getResumeStatusTickets(userID, userType);
  }

  @Get('ticketsPriority/:userID/:userType/:periodo')
  async getPriority(
    @Param('userID') userID: string,
    @Param('userType') userType: string,
    @Param('periodo') periodo: string,
  ) {
    return this.relatorioService.getPriorityTickets(userID, userType, periodo);
  }

  @Get('ticketEvolution/:userID/:userType')
  async getTicketEvolution(
    @Param('userID') userID: string,
    @Param('userType') userType: string,
  ) {
    return this.relatorioService.getTicketEvolution(userID, userType);
  }

  @Get('ticketTimeResolution/:userID/:userType/:periodo')
  async getAverageResolutionTime(
    @Param('userID') userID: string,
    @Param('userType') userType: string,
    @Param('peridodo') periodo: string,
  ) {
    return this.relatorioService.getAverageResolutionTime(userID, userType, periodo);
  }

  @Get('metricas/:userID/:userType')
  async dashboardMetrics(
    @Param('userID') userID: string,
    @Param('userType') userType: string,
  ){
    return this.relatorioService.getDashboardMetrics(userID, userType);
  }
}
