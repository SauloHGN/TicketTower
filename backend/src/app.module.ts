import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CacheModule } from '@nestjs/cache-manager';
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
    CacheModule.register(),

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
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
