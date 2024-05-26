import { Module } from '@nestjs/common';
import { CadastroController } from './cadastro.controller';
import { CadastroService } from './cadastro.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [CadastroController],
  providers: [CadastroService],
})
export class CadastroModule {}
