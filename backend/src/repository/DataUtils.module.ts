import { Module } from '@nestjs/common';
import { DataUtilsService } from './DataUtils.service';
import { Clientes } from 'src/entity/clientes.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataUtilsController } from './DataUtils.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clientes, Funcionarios, UsersView])],
  controllers: [DataUtilsController],
  providers: [DataUtilsService],
  exports: [DataUtilsService], // Exporte o provedor
})
export class DataUtilsModule {}
