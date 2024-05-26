import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// ----------------------------------------------------------------------
import { AppService } from './app.service';
import { DataBaseConfigService } from './config/bd.config.service';
// ----------------------------------------------------------------------
import { AppController } from './app.controller';
// ----------------------------------------------------------------------
import { Clientes } from './entity/clientes.entity';
import { Funcionarios } from './entity/funcionarios.entity';
import { Setores } from './entity/setores.entity';
import { Empresas } from './entity/empresas.entity';
// ----------------------------------------------------------------------
import { TicketModule } from './objects/ticket/ticket.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { AuthModule } from './auth/auth.module';
import { RelatorioModule } from './objects/relatorio/relatorio.module';
import { FuncionarioModule } from './users/funcionario/funcionario.module';
import { ClienteModule } from './users/cliente/cliente.module';
// ----------------------------------------------------------------------

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfigService,
      inject: [DataBaseConfigService],
    }),
    TypeOrmModule.forFeature([Funcionarios, Clientes, Setores, Empresas]),
    // TicketModule,
    // CadastroModule,
    // AuthModule,
    // RelatorioModule,
    // FuncionarioModule,
    // ClienteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
