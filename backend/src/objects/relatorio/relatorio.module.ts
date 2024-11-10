import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';
import { Tickets } from 'src/entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setores } from 'src/entity/setores.entity';
import { TicketService } from '../ticket/ticket.service';
import { SetoresService } from 'src/setores/setores.service';
import { UsersView } from 'src/entity/usersView.entity';
import { Sla } from 'src/entity/sla.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { TicketTransfer } from 'src/entity/ticketTransfer.entity';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { SlaService } from '../sla/sla.service';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clientes,
      Tickets,
      Funcionarios,
      UsersView,
      Setores,
      Sla,
      TicketTransfer,
      Tickets
    ]),
  ],
  controllers: [RelatorioController],
  providers: [
    RelatorioService,
    TicketService,
    SetoresService,
    FuncionarioService,
    DataUtilsService,
    SlaService,
    EmailService,
    AuthService,
    JwtService,
    UtilsService
  ],
  exports: [RelatorioService],
})
export class RelatorioModule {}
