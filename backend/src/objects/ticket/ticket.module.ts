import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { FuncionarioService } from 'src/users/funcionario/funcionario.service';
import { Tickets } from 'src/entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { UsersView } from 'src/entity/usersView.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tickets, Funcionarios, UsersView])],
  controllers: [TicketController],
  providers: [TicketService, FuncionarioService],
  exports: [TicketService],
})
export class TicketModule {}
