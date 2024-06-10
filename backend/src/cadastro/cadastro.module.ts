import { Module } from '@nestjs/common';
import { CadastroController } from './cadastro.controller';
import { CadastroService } from './cadastro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionarios } from 'src/entity/funcionarios.entity';
import { Clientes } from 'src/entity/clientes.entity';
import { Empresas } from 'src/entity/empresas.entity';
import { Setores } from 'src/entity/setores.entity';
import { Enderecos } from 'src/entity/enderecos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Funcionarios,
      Clientes,
      Empresas,
      Setores,
      Enderecos,
    ]),
  ],
  controllers: [CadastroController],
  providers: [CadastroService],
})
export class CadastroModule {}
