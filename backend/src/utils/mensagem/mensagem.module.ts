import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagens } from 'src/entity/mensagens.entity';
import { MensagemService } from './mensagem.service';
import { Anexos } from 'src/entity/anexos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mensagens,
      Anexos
    ])
  ],
  providers: [MensagemService],
  exports: [MensagemService],
})
export class MensagemModule {}
