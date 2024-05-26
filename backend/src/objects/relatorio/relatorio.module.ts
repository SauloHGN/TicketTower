import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';

@Module({
  imports: [],
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}
