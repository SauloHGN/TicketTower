import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ------------------------------------------------------------------------------------
import { AuthController } from './auth/auth.controller';
import { FuncionarioController } from './users/funcionario/funcionario.controller';
import { ClienteController } from './users/cliente/cliente.controller';
import { AdminController } from './users/admin/admin.controller';
import { EquipamentoController } from './users/equipamento/equipamento.controller';
import { CadastroController } from './cadastro/cadastro.controller';
import { CadastroService } from './cadastro/cadastro.service';
import { CadastroModule } from './cadastro/cadastro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: 'root', //username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'tickettower', //database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot(),
    CadastroModule,
  ],
  controllers: [
    AppController,
    AuthController,
    FuncionarioController,
    ClienteController,
    AdminController,
    EquipamentoController,
    CadastroController,
  ],
  providers: [AppService, CadastroService],
})
export class AppModule {}
