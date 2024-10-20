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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clientes,
      Tickets,
      Funcionarios,
      UsersView,
      Setores,
      Sla
    ]),
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    FuncionarioService,
    DataUtilsService,
    SetoresService,
  ],
  exports: [TicketService],
})
export class TicketModule {}
