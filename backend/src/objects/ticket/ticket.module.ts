import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { Tickets } from 'src/entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { Clientes } from 'src/entity/clientes.entity';
import { SetoresService } from 'src/setores/setores.service';
import { Setores } from 'src/entity/setores.entity';
import { Sla } from 'src/entity/sla.entity';
import { SlaService } from '../sla/sla.service';
import { MensagemService } from 'src/utils/mensagem/mensagem.service';
import { Mensagens } from 'src/entity/mensagens.entity';
import { Anexos } from 'src/entity/anexos.entity';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TicketTransfer } from 'src/entity/ticketTransfer.entity';
import { RelatorioService } from '../relatorio/relatorio.service';
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
      Mensagens,
      Anexos,
      TicketTransfer
    ]),
    MulterModule.register({
      dest: './uploads', // Configura o destino dos uploads temporários
    }),
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    FuncionarioService,
    DataUtilsService,
    SetoresService,
    SlaService,
    MensagemService,
    EmailService,
    AuthService,
    JwtService,
    RelatorioService,
    UtilsService
  ],
  exports: [TicketService],
})
export class TicketModule {}
