import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// ----------------------------------------------------------------------
import { DataBaseConfigService } from './config/bd.config.service';
// ----------------------------------------------------------------------
import { AuthModule } from './auth/auth.module';
import { Funcionarios } from './entity/funcionarios.entity';
import { Clientes } from './entity/clientes.entity';
import { Empresas } from './entity/empresas.entity';
import { Setores } from './entity/setores.entity';
import { EmpresasModule } from './empresas/empresas.module';
import { SetoresModule } from './setores/setores.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { Enderecos } from './entity/enderecos.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
// ----------------------------------------------------------------------

@Module({
  imports: [
    // Modules
    AuthModule,
    EmpresasModule,
    SetoresModule,
    CadastroModule,

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
    ]),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
