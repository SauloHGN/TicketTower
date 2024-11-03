import { Controller, Get, Query } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get('ticketStatus')
  async getStatusSummary(@Query('userID') userID: string, @Query('userType') userType: string) {
    return this.relatorioService.getResumeStatusTickets(userID, userType);
  }

  @Get('ticketsPriority')
  async getPriority(@Query('userID') userID: string, @Query('userType') userType: string) {
    return this.relatorioService.getPriorityTickets(userID, userType);
  }

  @Get('ticketEvolution')
  async getTicketEvolution(@Query('userID') userID: string, @Query('userType') userType: string) {
    return this.relatorioService.getTicketEvolution(userID, userType);
  }

  @Get('ticketTimeResolution')
  async getAverageResolutionTime(@Query('userID') userID: string, @Query('userType') userType: string) {
    return this.relatorioService.getAverageResolutionTime(userID, userType);
  }
}
