import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagens } from 'src/entity/mensagens.entity';
import { MensagemService } from './mensagem.service';
import { Anexos } from 'src/entity/anexos.entity';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsService } from 'src/repository/DataUtils.service';
import { Clientes } from 'src/entity/clientes.entity';
import { Funcionarios } from 'src/entity/funcionarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mensagens,
      Anexos,
      Clientes,
      Funcionarios,
      UsersView,
    ])
  ],
  providers: [MensagemService, DataUtilsService],
  exports: [MensagemService],
})
export class MensagemModule {}
