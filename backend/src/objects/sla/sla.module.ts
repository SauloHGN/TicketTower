import { Module } from '@nestjs/common';
import { SlaService } from './sla.service';
import { SlaController } from './sla.controller';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from 'src/entity/ticket.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { Setores } from 'src/entity/setores.entity';
import { Sla } from 'src/entity/sla.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Clientes,
      Tickets,
      Funcionarios,
      UsersView,
      Setores,
      Sla
    ]),
  ],
  providers: [SlaService, DataUtilsService],
  controllers: [SlaController],
  exports: [SlaService],
})
export class SlaModule {}
