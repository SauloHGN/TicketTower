import { Module } from '@nestjs/common';
import { SetoresController } from './setores.controller';
import { Setores } from 'src/entity/setores.entity';
import { SetoresService } from './setores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Tickets } from 'src/entity/ticket.entity';
import { TicketService } from 'src/objects/ticket/ticket.service';
import { UsersView } from 'src/entity/usersView.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { Sla } from 'src/entity/sla.entity';
import { Mensagens } from 'src/entity/mensagens.entity';
import { Anexos } from 'src/entity/anexos.entity';
import { TicketTransfer } from 'src/entity/ticketTransfer.entity';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { SlaService } from 'src/objects/sla/sla.service';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clientes,
      Tickets,
      Funcionarios,
      UsersView,
      Setores,
      Sla,
      Mensagens,
      Anexos,
      TicketTransfer,
    ]),
  ],
  controllers: [SetoresController],
  providers: [
    SetoresService,
    TicketService,
    FuncionarioService,
    DataUtilsService,
    SlaService,
    EmailService,
    AuthService,
    JwtService,
  ],
  exports: [SetoresService],
})
export class SetoresModule {}
