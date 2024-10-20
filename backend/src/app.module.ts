import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ----------------------------------------------------------------------
import { DataBaseConfigService } from './config/bd.config.service';
// ----------------------------------------------------------------------
import { Funcionarios } from './entity/funcionarios.entity';
import { Clientes } from './entity/clientes.entity';
import { Empresas } from './entity/empresas.entity';
import { Setores } from './entity/setores.entity';
import { UsersView } from './entity/usersView.entity';
import { Enderecos } from './entity/enderecos.entity';
// ----------------------------------------------------------------------
import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';
import { SetoresModule } from './setores/setores.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { EmailModule } from './email/email.module';
import { DataUtilsModule } from './repository/DataUtils.module';
import { TicketModule } from './objects/ticket/ticket.module';
import { Tickets } from './entity/ticket.entity';
import { Sla } from './entity/sla.entity';
import { SlaModule } from './objects/sla/sla.module';
// ----------------------------------------------------------------------

@Module({
  imports: [
    // Modules
    AuthModule,
    EmpresasModule,
    SetoresModule,
    CadastroModule,
    EmailModule,
    DataUtilsModule,
    TicketModule,
    SlaModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfigService,
      inject: [DataBaseConfigService],
    }),
    TypeOrmModule.forFeature([
      Funcionarios,
      Clientes,
      Empresas,
      Setores,
      Enderecos,
      UsersView,
      Tickets,
      Sla
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
